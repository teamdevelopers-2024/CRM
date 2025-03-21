import Counter from "../model/Counter.js"
import Employee from "../model/EmployeeDb.js"
import Close from "../model/closeDb.js"
import { generateLeadReference } from "./adminController.js"


async function employeeLogin(req, res) {
    try {
        let { userID, password } = req.body
        console.log(req.body)
        userID = userID.toUpperCase()
        if (!userID) {
            return res.status(400).json({
                error: true,
                message: "UserID is required",
                field: "userID"
            })
        }
        if (!password) {
            return res.status(400).json({
                error: true,
                message: "Password is required",
                field: "password"
            })
        }

        const employee = await Employee.findOne({ employeeId: `#${userID}` })
        console.log(employee)
        if (employee) {
            if (employee.Password != password) {
                return res.status(400).json({
                    error: true,
                    message: "Incorrect Password",
                    field: 'password',
                })
            }
            res.status(200).json({
                error: false,
                message: "employee logged In successfully",
                employeeId: employee.employeeId
            })
        } else {
            res.status(400).json({
                error: true,
                message: "user does not exists",
                field: "userID"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "Internel server Error"
        })
    }
}



async function getLeads(req, res) {
    try {
        const { id, searchText, filterDate } = req.body;

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
        // if (searchText) {
        //     filteredLeads = filteredLeads.filter(lead => 
        //         (lead.name && lead.name.match(new RegExp(searchText, 'i'))) || 
        //         (lead.email && lead.email.match(new RegExp(searchText, 'i'))) || 
        //         (lead.phone && lead.phone.match(new RegExp(searchText, 'i')))
        //     );
        // }

        // Filter by filterDate if provided
        // if (filterDate) {
        //     const filterDateObj = new Date(filterDate);
        //     filteredLeads = filteredLeads.filter(lead => lead.date && lead.date >= filterDateObj);
        // }

        console.log(filteredLeads.length)

        // Return the response
        res.status(200).json({
            error: false,
            data: filteredLeads, // This will be an empty array if there are no leads
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
        const { newStatus, employeeId, id ,remark } = req.body;
        console.log(newStatus, employeeId, id ,remark)
        
        // Validate input
        if (!newStatus || !employeeId || !id) {
            return res.status(400).json({ error: true, message: 'status , employeeId , leadId  are required.' });
        }

        if(remark){ 
            const result = await Employee.updateOne(
                { employeeId: employeeId, 'leads._id': id },
                { 
                    $set: { 
                        'leads.$.status': newStatus,
                        'leads.$.remark': remark // Ensure remark is inside the leads array item
                    } 
                }
            );            
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: true, message: 'Lead not found or status already updated.' });
            }
    
            res.status(200).json({ error: false, message: 'Lead status updated successfully.' });
        }else{
            const result = await Employee.updateOne(
                { employeeId: employeeId, 'leads._id': id },
                { $set: { 'leads.$.status': newStatus} }
            );
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: true, message: 'Lead not found or status already updated.' });
            }
    
            res.status(200).json({ error: false, message: 'Lead status updated successfully.' });
        }

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
            return res.status(400).json({ error: true, message: 'All fields are required' });
        }

        // Find the employee by employeeId
        const employee = await Employee.findOne({ employeeId: employeeId });
        console.log("employeeName : ", employee)
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
            leadReference: leadReference,
            employeeName: employee.name
        });

        // Save the Close document
        await closeData.save();

        return res.status(201).json({ error: false, message: 'Close request saved successfully', closeData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'An error occurred while processing the request', details: error.message });
    }
}




async function fetchUser(req, res) {
    try {
        const id = req.query.employeeId;

        // Fetch employee details based on employeeId
        const result = await Employee.findOne({ employeeId: id });

        if (!result) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Calculate total sales by filtering leads with status === "closed"
        const totalSales = result.leads.filter(lead => lead.status === "closed").length;

        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
        const daysLeft = (lastDayOfMonth - today) / (1000 * 60 * 60 * 24); // Difference in days

        // Respond with employee details and total sales
        return res.status(200).json({
            error: false,
            data: {
                employeeId: id,
                name: result.name,
                joinDate: result.JoiningDate,
                totalSales: totalSales, // Total number of closed leads
                phone: result.phoneNumber,
                designation: result.Designation,
                daysLeft: daysLeft
            }
        });

    } catch (error) {
        console.error("Error in fetchUser:", error);
        return res.status(500).json({ error: true, message: "internel server error" });
    }
}



async function addCustomLead(req, res) {
    try {
        console.log("getting here ")
        const { name, college, email, phone, district, empId } = req.body;
        // Validate required fields
        if (!name || !phone) {
            return res.status(400).json({
                error: true,
                message: "Name and phone number are required!",
            });
        }

        console.log("Request Body:", req.body);
        const reference = await generateLeadReference(req.body)
        // Update employee's leads array
        const result = await Employee.updateOne(
            { employeeId: empId },
            {
                $push: {
                    leads: {
                        name,
                        college,
                        email,
                        phone,
                        district, 
                        status: "N/A",
                        leadReference: reference,
                        customAddedd:true
                    }
                }
            }
        );

        console.log("Update Result:", result);

        // Check if the update was successful
        if (result.modifiedCount === 0) {
            return res.status(404).json({
                error: true,
                message: "Employee not found or no update made!",
            });
        }

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Lead added successfully!",
        });

    } catch (error) {
        console.error("Error adding lead:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
}






async function socialLeads(req, res) {
    try {
        console.log(req.body); 
        const counter = await Counter.findOneAndUpdate(
            {}, // Empty filter to target the single document
            { $inc: { count: 1 } }, // Increment the counter by 1
            { new: true, upsert: true } // Return the updated counter or create if it doesn't exist
        );
        let lastAssignedEmployeeIndex = counter.count
        const formData = {
            email: req.body.email,
            name: req.body.name ,
            phone: req.body.phone,
            district : req.body.place ,
            college: req.body.college
        }
        
        const employees = await Employee.find({}); 
        
        if (employees.length === 0) {
            return res.status(400).send("No employees available");
        }

        const assignedEmployee = employees[lastAssignedEmployeeIndex];

        await Employee.findByIdAndUpdate(
            assignedEmployee._id, 
            { $push: { socialLeads: formData } }, 
        );
        res.status(200).send(`Lead assigned to employee: ${assignedEmployee.name}`)
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while assigning the lead");
    }
}







export default {
    employeeLogin,
    getLeads,
    updateLeadStatus,
    closeRequest,
    fetchUser,
    addCustomLead,
    socialLeads
}
