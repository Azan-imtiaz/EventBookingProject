const eventModel = require("../models/eventModel");

exports.getAllEvents = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.ticketPrice) {
            filter.ticketPrice = { $lte: req.query.ticketPrice };
        }

        const events = await eventModel.find(filter);
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getEventById = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        console.error("Error fetching event:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, ticketPrice, totalSeats } = req.body;
        const newEvent = new eventModel({ title, description, date, location, category, ticketPrice, totalSeats, createdBy: req.user._id });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, ticketPrice, totalSeats } = req.body;
        const updatedEvent = await eventModel.findByIdAndUpdate(req.params.id, { title, description, date, location, category, ticketPrice, totalSeats }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(updatedEvent);
    } catch (err) {
        console.error("Error updating event:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await eventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({ message: "Server error" });
    }
};
