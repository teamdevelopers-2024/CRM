import Employee from "../model/EmployeeDb.js"
import Close from "../model/closeDb.js"


async function employeeLogin(req,res) {
    try {
        let {userID ,password} = req.body
        console.log(req.body)
        userID = userID.toUpperCase()
        if(!userID ){
            return res.status(400).json({
                error:true,
                message:"UserID is required",
                field:"userID"
            })
        }
        if(!password){
            return res.status(400).json({
                error:true,
                message:"Password is required",
                field:"password"
            })
        }

        const employee = await Employee.findOne({employeeId:`#${userID}`})
        console.log(employee)
        if(employee){
            if(employee.Password != password){
                return res.status(400).json({
                    error:true,
                    message:"Incorrect Password",
                    field:'password',
                })
            }
            res.status(200).json({
                error:false,
                message:"employee logged In successfully",
                employeeId:employee.employeeId
            })
        }else{
            res.status(400).json({
                error:true,
                message:"user does not exists",
                field:"userID"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel server Error"
        })
    }
}



async function getLeads(req, res) {
    try {
        const { id, page = 1, searchText, filterDate } = req.body;
        const limit = 9;
        const skip = (page - 1) * limit;

        console.log('Employee ID:', id);
        console.log('Search Text:', searchText);
        console.log('Filter Date:', filterDate);

        // Step 1: Find the employee
        const employeeWithLeads = await Employee.findOne({ employeeId: id });

        // Check if the employee exists
        if (!employeeWithLeads) {
            return res.status(404).json({
                error: true,
                message: "Employee not found",
            });
        }

        // Step 2: Extract leads and filter based on searchText and filterDate
        let filteredLeads = employeeWithLeads.leads || [];

        // Filter by searchText if provided
        if (searchText) {
            filteredLeads = filteredLeads.filter(lead => 
                (lead.name && lead.name.match(new RegExp(searchText, 'i'))) || 
                (lead.email && lead.email.match(new RegExp(searchText, 'i'))) || 
                (lead.phone && lead.phone.match(new RegExp(searchText, 'i')))
            );
        }

        // Filter by filterDate if provided
        if (filterDate) {
            const filterDateObj = new Date(filterDate);
            filteredLeads = filteredLeads.filter(lead => lead.date && lead.date >= filterDateObj);
        }

        // Step 3: Implement pagination
        const totalLeads = filteredLeads.length;
        const paginatedLeads = filteredLeads.slice(skip, skip + limit);

        // Return the response
        res.status(200).json({
            error: false,
            data: paginatedLeads, // This will be an empty array if there are no leads
            total: totalLeads,
            page: parseInt(page, 10),
            totalPages: Math.ceil(totalLeads / limit),
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
}







async function updateLeadStatus(req, res) {
    try {
        const { newStatus, employeeId, id } = req.body;
        console.log(newStatus, employeeId,id)
        // Validate input
        if (!newStatus || !employeeId || !id) {
            return res.status(400).json({ error: true, message: 'status , employeeId , leadId  are required.' });
        }

        const result = await Employee.updateOne(
            { employeeId: employeeId, 'leads._id': id }, 
            { $set: { 'leads.$.status': newStatus } } 
        );

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: true, message: 'Lead not found or status already updated.' });
        }

        res.status(200).json({ error: false, message: 'Lead status updated successfully.' });
    } catch (error) {
        console.error('Error updating lead status:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}



async function closeRequest(req, res) {
    try {
        const { url, employeeId, leadReference, clientPhone, reference  } = req.body;

        // Validate the required fields
        if (!url || !employeeId || !leadReference || !clientPhone || !reference) {
            return res.status(400).json({ error: true, message: 'All fields are required' });
        }

        // Find the employee by employeeId
        const employee = await Employee.findOne({ employeeId: employeeId });
        console.log("employeeName : ",employee)
        if (!employee) {
            return res.status(404).json({ error: true, message: 'Employee not found' });
        }

        // Update the lead's status directly in the Employee document
        const updateResult = await Employee.updateOne(
            { employeeId: employeeId, 'leads.leadReference': leadReference },
            { $set: { 'leads.$.status': 'close requested' } } // Update the status of the specific lead
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({ error: true, message: 'Lead not found' });
        }

        // Create a new Close document
        const closeData = new Close({
            paymentScreenshot: url,
            reference: reference, // Use the reference from the request body
            employeeId: employee.employeeId, // Store the employee ID
            clientPhone: clientPhone,
            leadReference:leadReference,
            employeeName:employee.name
        });

        // Save the Close document
        await closeData.save();

        return res.status(201).json({ error: false, message: 'Close request saved successfully', closeData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'An error occurred while processing the request', details: error.message });
    }
}





export default {
    employeeLogin,
    getLeads,
    updateLeadStatus,
    closeRequest
}