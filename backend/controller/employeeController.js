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
        const { id, page = 1 } = req.body; // Get 'id' and 'page' from request body
        const limit = 9; // Number of leads per page
        const skip = (page - 1) * limit; // Calculate how many leads to skip
        console.log(id)
        const employee = await Employee.findOne({ employeeId: id }); // Find the employee by their ID
        if (!employee) {
            return res.status(404).json({
                error: true,
                message: "Employee not found",
            });
        }

        // Fetch leads with pagination
        const leads = employee.leads.slice(skip, skip + limit); // Get the specific slice of leads
        const totalLeads = employee.leads.length; // Total number of leads
        console.log("leads",leads)
        res.status(200).json({
            error: false,
            data: leads,
            total: totalLeads,
            page: parseInt(page, 10),
            totalPages: Math.ceil(totalLeads / limit), // Calculate total number of pages
        });
    } catch (error) {
        console.error(error);
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
        const { url, employeeId, leadReference, clientPhone, reference } = req.body;

        // Validate the required fields
        if (!url || !employeeId || !leadReference || !clientPhone || !reference) {
            return res.status(400).json({error:true , message: 'All fields are required' });
        }

        // Find the employee by employeeId
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({error:true , message: 'Employee not found' });
        }

        // Create a new Close document
        const closeData = new Close({
            paymentScreenshot: url,
            reference: reference, // Use the reference from the request body
            employeeId: employee._id, // Store the employee ID
            clientPhone: clientPhone,
        });

        // Save the Close document
        await closeData.save();

        return res.status(201).json({ error:false , message: 'Close request saved successfully', closeData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error:true,  message: 'An error occurred while processing the request', error: error.message });
    }
}




export default {
    employeeLogin,
    getLeads,
    updateLeadStatus,
    closeRequest
}