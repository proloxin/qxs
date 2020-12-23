'use strict';
exports.main = async (event, context) => {
	/*
	累加orders表中的closeprice，输出今日总交易额
	*/
	const db = uniCloud.database();
	const $ = db.command.aggregate
	return new Promise(async(resolve,reject)=>{
	    try {
	        let res = await db.collection('user-sort').aggregate()
			.group({
				_id: null,
				count: $.sum('$closeprice_today'),
			})
			.end()
	        resolve(res)
	    } catch (err) {
	        reject(err)
	    }
	})
	

};
