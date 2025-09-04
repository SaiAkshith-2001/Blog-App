export default (...Roles) =>
  (req, res, next) => {
    req.currentRole = Roles;
    next();
  };

// const roles = [
//   { name: "admin", permissions: ["users.*", "posts.*"] },
//   {
//     name: "user",
//     permissions: ["posts.create", "posts.edit", "posts.publish"],
//   },
//   { name: "guest", permissions: ["posts.read"] },
// ];
