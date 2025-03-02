import { findAndDeleteLeads } from "../database/getLead.js"
import Employee from "../model/EmployeeDb.js"
import validateEmployeeData from "../services/employeeValidator.js"
import 'dotenv/config'
import { createHash } from 'crypto'; // Import the crypto module
import Close from "../model/closeDb.js";
import Lead from "../model/leadSchema.js";

// Function to generate a unique reference for each lead
export const generateLeadReference = (lead) => {
    const hash = createHash('sha256');
    hash.update(JSON.stringify(lead) + Date.now()); // Use lead details and current time for uniqueness
    return `LEAD-${hash.digest('hex').substr(0, 8)}`; // Return first 8 characters of the hash
};


async function addEmploye(req, res) {
    try {
        const data = req.body
        console.log(req.body)
        const result = await validateEmployeeData(data)
        if (result.valid == false) {
            return res.status(400).json({
                error: true,
                message: result.message
            })
        }


        await Employee.create(data)
        res.status(200).json({
            error: false,
            message: "employee added successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "Internel Server Error"
        })
    }
}



async function getEmployees(req, res) {
    try {
        const result = await Employee.find().sort({ _id: -1 })
        res.status(200).json({
            error: false,
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Internel Server Error"
        })
    }
}


async function getEmployeesForLeads(req, res) {
    try {
        const { page = 1, limit = 9 } = req.query; // Default to page 1, 9 employees per request
        const skip = (page - 1) * limit;

        const result = await Employee.find().sort({ _id: -1 }).skip(skip).limit(parseInt(limit));
        const totalEmployees = await Lead.countDocuments(); // Get total number of employees
        console.log(result)
        res.status(200).json({
            error: false,
            data: result,
            totalEmployees
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}



async function adminLogin(req, res) {
    try {
        const { username, password } = req.body
        console.log(req.body)
        if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
            return res.status(200).json({
                error: false,
                message: "admin logged in successfully",
                role: "admin"
            })
        } else if (username == process.env.SUPERADMIN_USERNAME && process.env.SUPERADMIN_PASSWORD == password) {
            console.log("noting is wrong")
            return res.status(200).json({
                error: false,
                message: "super admin logged in successfully",
                role: "superadmin"
            })
        } else {
            res.status(400).json({
                error: true,
                message: "invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "Internel Server Error"
        })
    }
}

async function individualAssign(req, res) {
    try {
        const { id, count } = req.body;

        // Fetch the leads based on count
        const leads = await findAndDeleteLeads(count);
        console.log(id, count);

        if (!leads || leads.length === 0) {
            return res.status(404).json({ error: true, message: 'No leads available to assign.' });
        }

        // Fetch the employee based on employeeId
        const employee = await Employee.findOne({ employeeId: id });

        if (!employee) {
            return res.status(404).json({ error: true, message: 'Employee not found.' });
        }

        // Add a default 'status' field to each lead
        // Create an array of lead objects with necessary fields
        const leadsData = leads
        .filter(lead => lead.name && lead.phone) // Filter leads that have both name and phone
        .map(lead => ({
          leadReference: generateLeadReference(lead), // Generate unique lead reference for each lead
          name: lead.name,
          email: lead.email,
          college: lead.college,
          phone: lead.phone,
          district: lead.district,
          course: lead.course,
          fatherName: lead.fatherName,
          alternatePhone: lead.alternatePhone,
          status: 'N/A'
        }));
      

        // Push the leads data into the leads array for the employee
        await Employee.updateOne(
            { employeeId: id }, // Filter condition to match the employee
            { $push: { leads: { $each: leadsData } } } // Push the leads data with references to leads array
        );


        res.status(200).json({ error: false, message: 'Leads assigned successfully', employee });
    } catch (error) {
        console.error('Error assigning leads:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}



async function getCloseRequests(req, res) {
    try {
        const data = await Close.find({ status: "pending" }).sort({ _id: -1 })
        res.status(200).json({
            error: false,
            data: data
        })
    } catch (error) {
        console.error('Error assigning leads:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}


async function getRequestesCount(req, res) {
    try {
        const totalCount = await Close.countDocuments({ status: "pending" });
        res.status(200).json({
            error: false,
            count: totalCount
        })

    } catch (error) {
        console.error('Error assigning leads:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}
  

async function approveRequest(req, res) {
    try {
        const { reference, leadReference, employeeId } = req.body
        const closeupdate = await Close.updateOne({ reference: reference }, { $set: { status: "Approved" } })
        const empupdate = await Employee.updateOne(
            { employeeId: employeeId, 'leads.leadReference': leadReference },
            { $set: { 'leads.$.status': 'closed' } } // Update the status of the specific lead
        );
        console.log(closeupdate)
        console.log(empupdate)
        res.status(200).json({
            error: false,
            message: "Request Approved Successfully"
        })
    } catch (error) {
        console.error('Error assigning leads:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}




async function handleReject(req, res) {
    try {
        const { reference, leadReference, employeeId, reason } = req.body
        const closeupdate = await Close.updateOne({ reference: reference }, { $set: { status: "Rejected" } })
        const empupdate = await Employee.updateOne(
            { employeeId: employeeId, 'leads.leadReference': leadReference },
            { $set: { 'leads.$.status': 'admin rejected' } } // Update the status of the specific lead
        );
        console.log(closeupdate)
        console.log(empupdate)
        res.status(200).json({
            error: false,
            message: "Request Rejected Successfully"
        })
    } catch (error) {
        console.error('Error Rejecting leads:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}





export default {
    addEmploye,
    getEmployees,
    adminLogin,
    getEmployeesForLeads,
    individualAssign,
    getCloseRequests,
    getRequestesCount,
    approveRequest,
    handleReject
}