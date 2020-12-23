<template>
	<scroll-view  class="mdiv" style="padding: 15px;box-sizing: border-box;">
		   
		   <image src="../../static/title.jpg" mode="" class="mimg"></image>
			<div class="leaderboard">
		      <header>
		    
		        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve" class="leaderboard__icon">
		          
		          <g>
		            <g>
		              <path d="M327.941,121.658c-1.395-4.288-5.103-7.414-9.566-8.064l-35.758-5.196l-15.991-32.402
		    			c-1.997-4.044-6.116-6.605-10.626-6.605c-4.511,0-8.63,2.561-10.626,6.605l-15.991,32.402l-35.758,5.196
		    			c-4.464,0.648-8.172,3.775-9.566,8.065c-1.393,4.291-0.231,8.999,2.999,12.148l25.875,25.221l-6.109,35.613
		    			c-0.763,4.446,1.064,8.938,4.714,11.59c3.648,2.651,8.487,3,12.479,0.902L256,190.32l31.982,16.813
		    			c1.734,0.911,3.627,1.36,5.512,1.36c2.456,0,4.902-0.763,6.966-2.263c3.65-2.652,5.477-7.144,4.714-11.59l-6.109-35.613
		    			l25.875-25.221C328.172,130.658,329.334,125.949,327.941,121.658z M278.064,146.405c-2.793,2.722-4.068,6.644-3.408,10.489
		    			l3.102,18.09l-16.245-8.541c-1.725-0.908-3.62-1.36-5.514-1.36c-1.894,0-3.788,0.454-5.514,1.36l-16.245,8.541l3.102-18.09
		    			c0.66-3.844-0.615-7.766-3.408-10.489l-13.141-12.81l18.162-2.64c3.859-0.56,7.196-2.985,8.922-6.482l8.123-16.458l8.122,16.458
		    			c1.727,3.497,5.062,5.921,8.922,6.482l18.162,2.64L278.064,146.405z" />
		            </g>
		          </g>
		        </svg>
		    
		        <h1 class="leaderboard__title"><span class="leaderboard__title--top">我的收益</span><span class="leaderboard__title--bottom"></span></h1>
		      </header>
		      
		      <main class="leaderboard__profiles" v-for="(item,index) in arr" :key="index">
		       
			   <article  class="leaderboard__profile">
		         <img src="static/rank/rmb.png"  class="leaderboard__picture">
		         <span class="leaderboard__name">今日收益</span>
		         <span class="leaderboard__value">{{item.balance_today/100}}<span style="font-size: 18px;color: rgba(0, 0, 0, 0.45)">元</span></span>
		       </article>
			   
				<article  class="leaderboard__profile">
		          <img src="static/rank/rmb.png"  class="leaderboard__picture">
		          <span class="leaderboard__name">在途快递</span>
		          <span class="leaderboard__value">{{item.ztbg}}<span style="font-size: 18px;color: rgba(0, 0, 0, 0.45)">单</span></span>
		        </article>
				
		        <article  class="leaderboard__profile">
		          <img src="static/rank/rmb.png"  class="leaderboard__picture">
		          <span class="leaderboard__name">总收益</span>
		          <span class="leaderboard__value">{{item.balance/100}}<span style="font-size: 18px;color: rgba(0, 0, 0, 0.45)">元</span></span>
		        </article>
		      </main>
		    </div>
			
			
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</scroll-view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	const db = uniCloud.database()
	export default {
		data() {
			return {
				arr:[],
				balance:0,
				balance_today:0,
				ztbg:0
				
			}
		},
		computed: {
			...mapState('user', ['userInfo']),
			
		},
		onLoad() {
			this.getSort()
			//console.log(this.userInfo)
		},
		methods: {
			getSort(){
				db.collection("user-sort")
				.where({mobile:this.userInfo.username})
				.limit(2)
				.get()
				.then((res) => {
					if(res.result.data.length==1){
						this.balance = res.result.data[0].balance,
						this.balance_today = res.result.data[0].balance_today
						
						db.collection("qxs-orders")
						.where({userid:this.userInfo.username,receive:false})
						.get({
								getCount: true
							})
						.then((res) => {		
							this.ztbg = res.result.count,
							this.arr.push({
								balance : this.balance,
								balance_today : this.balance_today,
								ztbg :　this.ztbg
							
							})
						}).catch((err) => {
							
						})
						
					}
				}).catch((err) => {
					
				})
				

				
			}
		}
	}
</script>

<style>
	.mimg{
		width: 490px;
		height: 100px;
	}
	.leaderboard {
	
	  max-width: 490px;
	  width: 100%;
	  border-radius: 12px;
	}
	.leaderboard header {
	  --start: 15%;
	  height: 130px;
	  background-image: linear-gradient(to right, #fa335e, #3659db);
	  color: #fff;
	  position: relative;
	  border-radius: 12px 12px 0 0;
	  overflow: hidden;
	}
	.leaderboard header::before {
	  content: '';
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-image: repeating-radial-gradient(circle at var(--start), transparent 0%, transparent 10%, #3659db 10%, #3659db 17%);
	  opacity: .15;
	  z-index: 1;
	}
	.leaderboard header .leaderboard__title {
	  position: absolute;
	  z-index: 2;
	  top: 50%;
	  right: calc(var(--start) * .75);
	  transform: translateY(-50%);
	  text-transform: uppercase;
	  margin: 0;
	}
	.leaderboard header .leaderboard__title span {
	  display: block;
	}
	.leaderboard header .leaderboard__title--top {
	  font-size: 24px;
	  font-weight: 700;
	  letter-spacing: 6.5px;
	}
	.leaderboard header .leaderboard__title--bottom {
	  font-size: 13px;
	  font-weight: 500;
	  letter-spacing: 3.55px;
	  opacity: .65;
	  transform: translateY(-2px);
	}
	.leaderboard header .leaderboard__icon {
	  fill: #fff;
	  opacity: .35;
	  width: 50px;
	  position: absolute;
	  top: 50%;
	  left: var(--start);
	  transform: translate(-50%, -50%);
	}
	.leaderboard__profiles {
	  background-color: #fff;
	  border-radius: 0 0 12px 12px;
	  padding: 15px 15px 20px;
	  display: grid;
	  row-gap: 8px;
	}
	.leaderboard__profile {
	  display: grid;
	  grid-template-columns: 1fr 3fr 1fr;
	  align-items: center;
	  padding: 10px 30px 10px 10px;
	  overflow: hidden;
	  border-radius: 10px;
	  box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
	  cursor: pointer;
	  transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98), box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
	  background-color: #fff;
	}
	.leaderboard__profile:hover {
	  transform: scale(1.2);
	  box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
	}
	.leaderboard__picture {
	  max-width: 100%;
	  width: 60px;
	  border-radius: 50%;
	  box-shadow: 0 0 0 10px #ebeef3, 0 0 0 25px #f3f4f6;
	}
	.leaderboard__name {
	  color: #979cb0;
	  font-weight: 600;
	  font-size: 20px;
	  /* letter-spacing: 0.64px; */
	  margin-left: 12px;
	}
	.leaderboard__value {
	  color: #35d8ac;
	  font-weight: 700;
	  font-size: 24px;
	  text-align: right;
	}
	.leaderboard__value2 {
	  color: #35d8ac;
	  font-weight: 800;
	  /* font-size: 24px; */
	  text-align: right;
	}
	.leaderboard__value > span {
	  opacity: .8;
	  font-weight: 600;
	  font-size: 13px;
	  /* margin-left: 3px; */
	  text-align: right;
	}
	
	body {
	  margin: 0;
	  background-color: #eaeaea;
	  display: grid;
	  height: 100vh;
	  place-items: center;
	  font-family: 'Source Sans Pro', sans-serif;
	}
	
	.leaderboard {
	  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
	}
	
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}

	/* #endif */
</style>
