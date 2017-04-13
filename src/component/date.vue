<template>
    <div class="date">
        <input type="text" class="form-control" placeholder="date" aria-describedby="basic-addon1" @click="datas" ref="input" v-model="date" readonly='readonly'>
        <div class="panel panel-primary" style="width: 340px;text-align: center" v-show="seen">
            <div class="panel-heading" style="font-size: 24px;">
                <span class="iconfont icon-back" @click="lessen('y')"></span>
                {{year}}
                <span class="iconfont icon-front" @click="add('y')"></span>
                <span class="iconfont icon-back" @click="lessen"></span>
                {{month}}
                <span class="iconfont icon-front" @click="add"></span>
                <span class="iconfont icon-close" @click="close"></span>
                <ul class="e"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul>
            </div>
            <div class="table">
                <ul>
                    <template v-for="fts in ft">
                        <li class="def front">{{fts}}</li>
                    </template>
                    <template v-for="cts in ct">
                        <li class="center" @click="myday(cts)">{{cts}}</li>
                    </template>
                    <template v-for="ats in at">
                        <li class="def after">{{ats}}</li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data () {
        return {
            day: Number,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            ft:[],
            ct:[],
            at:[]
        }
    },
    computed: {
        seen() {
            return this.$store.state.seen
        },
        date() {
            return this.$store.state.questionnaire.date
        }
    },
    methods: {
        add(d) {
            if(d == "y"){
                this.year = this.year+1;
                this.datas()
            }else {
                if(this.month == 12){
                    this.year++;
                    this.month = 1;
                    this.datas()
                }else{
                    this.month = this.month+1;
                    this.datas()
                }
            }
        },
        lessen(d) {
            if(d == "y"){
                this.year = this.year-1;
                this.datas()
            }else {
                if(this.month == 1){
                    this.year--;
                    this.month = 12;
                    this.datas()
                }else{
                    this.month = this.month-1;
                    this.datas()
                }
            }
        },
        datas() {
            function months(y,w,d){
                let x = new Date(y,w,d).getDay();
                return x ;
            }
            function days(y,w){
                let x  = new Date(y,w,0).getDate();
                return x;
            }
            this.ft = [];
            this.ct = [];
            this.at = [];
            let w = this.month-1,y = this.year;
            let one = months(y,w,1);
            let front = 0;
            let after = 0;
            w == 0?front = days(y-1,11):front = days(y,w);
            w == 11?after = days(y+1,0):after = days(y,w+1);
            // 开头
            if(one != 0){
                let c = front-one;
                let num = 0;
                for(let i = front;i > c; i--){
                    this.ft[num] = i;
                    num++;
                }
                this.ft.reverse()
            }
            // 本月
            for(let i=0;i<days(this.year,this.month);i++){
                this.ct[i] = i+1;
            }
            // 末尾
            let lengths = this.ft.length + this.ct.length;
            if(lengths != 42){
                for(let i = 0;i < 42 - lengths; i++){
                    this.at[i] = i+1;
                }            
            }
            this.$store.commit("switchSeen",{seen:true});
        },
        myday(day) {
            let now = new Date();
            this.day = day;
            if(this.year*10000+this.month*100+this.day>=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate()){
                this.$store.commit("modDate",{date:this.year +"-"+ this.month+ "-" + this.day});
            }else{
                alert("请输入正确的截止日期")
                return false;
            }
            this.$store.commit("switchSeen",{seen:false});
        },
        close() {
            this.$store.commit("switchSeen",{seen:false});
        }
    }
}
function getToDay() {
    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth()+1;
    let nowDate = now.getDate();
    return nowYear+"-"+nowMonth+"-"+nowDate;
}
</script>
<style>
.date {
    margin: 10px 30px 40px 30px;
    display: inline-block;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}
.date .table ul {
    padding: 0;
    margin: 0;
}
.date .table ul li {      
    width: 30px;
    height: 30px;
    margin: 7px;
    line-height: 30px;
    transition: 0.3s;
    text-align: center; 
    cursor: pointer;
    margin-top: 7px;
    font-size: 20px;
    display: inline-block;
    list-style-type: none;
}
.date .e {
    padding: 0;
    margin: 0;
}
.date .e li {      
    width: 30px;
    height: 30px;
    margin: 7px;
    line-height: 40px;
    transition: 0.3s;
    text-align: center; border-radius: 40px;
    text-align: center;
    cursor: pointer;
    margin-top: 7px;
    font-size: 20px;
    display: inline-block;
    list-style-type: none;
}
.date .def{
    color: #ccc;
}
.date .table li.center{
    border-radius: 20px;
}
.date .table li.center:hover{
    background: rgba(255,152,0,0.6);
    color: #fff;
}
.date .panel{
    margin-top: 10px;
    position: absolute;
    background: rgba(255,255,255,0.2);
}
.date .form-control{
    text-align: center;
    width: 60%;
    font-size: 16px;
    color: #fff;
    background: rgba(255,255,255,0.4);
}
.date .iconfont{
    cursor: pointer;
}
.date .icon-close{
    float: right;
    font-size: 20px;
    margin-top: 0.4em;
    margin-right: 0.4em;
}
</style>