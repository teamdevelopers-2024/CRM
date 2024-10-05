import Lead from "../model/leadSchema.js";

async function findAndDeleteLeads(limit) {
    try {
        // Find the leads with the specified limit
        const leadsToDelete = await Lead.find({}).limit(limit); // Get the first 'limit' leads

        if (leadsToDelete.length === 0) {
            console.log("No leads found to delete.");
            return;
        }

        // Log each lead document found
        leadsToDelete.forEach((lead, index) => {
            console.log(`Lead ${index + 1}:`, lead);
        });

        // Delete the found leads
        // const deleteResult = await Lead.deleteMany({ _id: { $in: leadsToDelete.map(lead => lead._id) } });

        console.log(`${deleteResult.deletedCount} leads deleted successfully.`);
        return leadsToDelete; // Optionally return the deleted leads
    } catch (error) {
        console.error(`Error finding and deleting leads: ${error.message}`);
    }
}

export { findAndDeleteLeads };
