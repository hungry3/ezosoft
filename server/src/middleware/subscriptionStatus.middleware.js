export const checkUserSubscription = async (user) => {
    const currentDate = new Date();
    if (user.subscriptionEndDate && currentDate > user.subscriptionEndDate) {
      user.subscriptionStatus = 'expired';
      await user.save();
    }
    return user.subscriptionStatus === 'active';
  };