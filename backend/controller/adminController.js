import Employee from "../model/EmployeeDb.js"
import validateEmployeeData from "../services/employeeValidator.js"
import 'dotenv/config'





async function addEmploye(req, res) {
    try {
        const data = req.body
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



// async function getEmployees(req, res) {
//     try {
//         // Get page and limit from query parameters, with defaults
//         const page = parseInt(req.query.page) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit) || 10; // Default to limit of 10
//         const skip = (page - 1) * limit; // Calculate number of documents to skip

//         // Fetch employees with pagination
//         const result = await Employee.find()
//             .sort({ _id: -1 })
//             .skip(skip)
//             .limit(limit);

//         // Get total count of employees for pagination
//         const count = await Employee.countDocuments();

//         res.status(200).json({
//             error: false,
//             data: result,
//             pagination: {
//                 currentPage: page,
//                 totalPages: Math.ceil(count / limit),
//                 totalDocuments: count,
//                 limit: limit
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: true,
//             message: "Internal Server Error"
//         });
//     }
// }

async function getEmployees(req, res) {
    try {
        // Get page, limit, and search term from query parameters, with defaults
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to limit of 10
        const skip = (page - 1) * limit; // Calculate number of documents to skip
        const searchTerm = req.query.search ? req.query.search.trim() : ''; // Get search term

        // Construct search query
        const searchQuery = searchTerm
            ? {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } }, // Assuming 'name' is a field
                    { position: { $regex: searchTerm, $options: 'i' } } // Add other fields as necessary
                ]
            }
            : {};

        // Fetch employees with pagination and search
        const result = await Employee.find(searchQuery)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count of employees for pagination with search
        const count = await Employee.countDocuments(searchQuery);

        res.status(200).json({
            error: false,
            data: result,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalDocuments: count,
                limit: limit
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}


async function getEmployeesForLeads(req, res) {
    try {
        const { page = 1, limit = 9 } = req.query; // Default to page 1, 9 employees per request
        const skip = (page - 1) * limit;

        const result = await Employee.find().sort({ _id: -1 }).skip(skip).limit(parseInt(limit));
        const totalEmployees = await Employee.countDocuments(); // Get total number of employees
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


export default {
    addEmploye,
    getEmployees,
    adminLogin,
    getEmployeesForLeads
}