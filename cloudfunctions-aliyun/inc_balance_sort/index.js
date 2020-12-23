'use strict';
exports.main = async (event, context) => {
	/*
	管理员确认结算后，使用该函数，增加今日收益和总收益、和今日结算价格
	*/
	const db = uniCloud.database();
	const dbCmd = db.command
	let {mobile,balance,decbalance,closeprice} =  event;
	return new Promise(async(resolve,reject)=>{
	    try {
	        let res = await db.collection('user-sort').where({
	        	mobile: mobile
	        }).update({
	        	balance: dbCmd.inc(balance),
				balance_today: dbCmd.inc(balance),
				tempbalance: dbCmd.inc(0-decbalance) ,
				closeprice_today: dbCmd.inc(closeprice)
	        })
	        resolve(res)
	    } catch (err) {
	        reject(err)
	    }
	})
	
};
