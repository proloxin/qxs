'use strict';
exports.main = async (event, context) => {
	/*
	定时任务，每天0点清空今日收益,并汇总今日总收益，添加到qxs-total-price表
	*/
	const db = uniCloud.database();
	const dbCmd = db.command
	const $ = db.command.aggregate
	//
	let res = await db.collection('user-sort').aggregate()
	.group({
		_id: null,
		count: $.sum('$balance_today'),
	})
	.end()
	
	let now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth()+1;
	let date = now.getDate();
	let today = year+"-"+month+"-"+date
	let price = 0
	
	if (res.data){
		price = res.data[0].count
	}
	
	await db.collection('qxs-total-price').add({
			date:today,
			price:price
		})
	
	await db.collection('user-sort').update({
		balance_today: dbCmd.set(0),
		closeprice_today: dbCmd.set(0)
	})
};
