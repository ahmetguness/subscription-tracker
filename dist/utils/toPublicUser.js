export const toPublicUser = (user) => {
    return {
        _id: typeof user._id === "string" ? user._id : user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt ? user.createdAt.toISOString() : undefined,
        // password: user.password,
    };
};
