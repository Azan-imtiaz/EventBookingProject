const router=require("express").Router();

const {protect,admin}=require("../middleware/authMiddleware");
const {getAllEvents,getEventById,createEvent,deleteEvent,updateEvent}=require("../controllers/eventConn");

router.get("/",getAllEvents);

router.get("/:id",getEventById);

router.post("/",protect,admin,createEvent);
router.delete("/:id",protect,admin,deleteEvent);
router.put("/:id",protect,admin,updateEvent);

module.exports=router;
