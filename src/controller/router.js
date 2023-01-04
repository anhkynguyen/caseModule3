const homeHandlerRouter = require("./handlerRouter/homeHandlerRouter");
const userHandlerRouter = require("./handlerRouter/userHandlerRouter")
const router = {
  'home': homeHandlerRouter.showHome,
  'create': homeHandlerRouter.createProduct,
  'delete': homeHandlerRouter.deleteProduct,
  'edit': homeHandlerRouter.editProduct,
  'login': userHandlerRouter.showFormLogin ,
  'register':userHandlerRouter.userRegister,
  '':homeHandlerRouter.showBeginHtml,
  'registerSuccess': userHandlerRouter.registerSuccess,
  'user':userHandlerRouter.showHomeUser

};
module.exports = router;
