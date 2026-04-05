const router=require("express").Router();
const {protect,admin}=require("../middleware/authMiddleware");
const {sendBookingOtp,bookEvent,getMyBookings,cancelBooking,confirmBooking}=require("../controllers/bookingConn");

router.post("/send-BookingOtp",protect,sendBookingOtp);
router.post("/book-event",protect,bookEvent);
router.post("/:id/confirm-booking",protect,admin,confirmBooking);
router.post("/my",protect,getMyBookings);

router.delete("/cancel/:id",protect,cancelBooking);

module.exports=router;