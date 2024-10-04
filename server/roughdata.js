import User from "./src/models/user.model";

router.post('/select-plan', asyncHandler(async (req, res, next) => {
  const { planId } = req.body;
  const userId = req.user.id;
  try {
    const plan = await SubscriptionPlan.findById(planId);

    if (!plan) {
      return next(new ErrorHandler('Subscription Plan not found', 404));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }


const now = new Date();

let endDate ;
if(plan.duration ==="monthly"){
  endDate = new Date(now.setMonth(now.getMonth()+1))

}
else if(plan.duration === "yearly"){
  endDate = new Date(now.setFullYear(now.getFullYear()+1))
}

    // Update the user's subscription plan
    user.subscriptionPlan = plan;
    user.subscriptionStartDate = new Date()
    user.subscriptionEndDate = endDate
    user.subscriptionStatus = 'active';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Subscription Plan selected successfully',
    });
  } catch (error) {
    return next(new ErrorHandler('Something went wrong', 500));
  }
}));

export default router;