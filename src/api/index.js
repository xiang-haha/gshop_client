/*
 包含n个接口请求函数的模块（与后台交互模块）
 函数的返回值：promise对象
*/
import ajax from './ajax'

const BASE_URL = '/api'

//1、根据经纬度获取位置详情
//export const reqAddress = geohash => ajax(BASE_URL + '/position/' + geohash)
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)

//2、获取msite页面食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')

//3、根据经纬度获取msite商铺列表 (经纬度作为一个参数传递加{})
export const reqShops = ({latitude, longitude}) => ajax(BASE_URL + '/shops', {latitude, longitude})

//4、根据经纬度和关键字搜索商铺列表
export const reqKeyShops = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})

//5、获取一次性验证码
export const reqCaptcha = () => ajax(BASE_URL + '/captcha')

//6、账号密码登录
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')

//7、获取短信验证码
export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', {phone})

//8、手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')

//9、获取用户信息(根据会话)
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

//10、请求登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

/*
 * 下面三个请求不需要代理，url不要加 /api
 */
//获取商家信息
export const reqShopInfo = () => ajax('/info')
//获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
//获取商家商品数组
export const reqShopGoods = () => ajax('/goods')
