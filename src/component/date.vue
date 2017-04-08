<template>
    <div class="date">
        <input type="text" class="form-control" placeholder="date" aria-describedby="basic-addon1" @click="datas" ref="input" v-model="date" readonly='readonly'>
        <div class="panel panel-primary" style="width: 340px;text-align: center" v-show="btn">
            <div class="panel-heading" style="font-size: 24px;">
                <span class="iconfont icon-back" @click="lessen('y')"></span>
                {{year}}
                <span class="iconfont icon-front" @click="add('y')"></span>
                <span class="iconfont icon-back" @click="lessen"></span>
                {{week}}
                <span class="iconfont icon-front" @click="add"></span>
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
let ft = new Array();
let ct = new Array();
let at = new Array();
let week = function(y,w,d){
    var x = new Date(y,w,d).getDay();
    return x ;
}
function days(y,w){
    var x  = new Date(y,w,0).getDate();
    return x;
}
    export default{
        data () {
            return {
                btn: false,
                day: Number,
                week: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                ft:[],
                ct:[],
                at:[]
            }
        },
        computed:{
            seen(){
                return this.$store.state.seen
            },
            date(){
                return this.$store.state.questionnaire.date
            }
        },
        methods:{
            add: function(d){
                if(d == "y"){
                    this.year = this.year+1;
                    this.datas()
                }else {
                    if(this.week == 12){
                        this.year++;
                        this.week = 1;
                        this.datas()
                    }else{
                        this.week = this.week+1;
                        this.datas()
                    }
                }
            },
            lessen:function(d){
                if(d == "y"){
                    this.year = this.year-1;
                    this.datas()
                }else {
                    if(this.week == 1){
                        this.year--;
                        this.week = 12;
                        this.datas()
                    }else{
                        this.week = this.week-1;
                        this.datas()
                    }
                }
            },
            datas: function(){
                function weeks(y,w,d){
                    var x = new Date(y,w,d).getDay();
                    return x ;
                }
                function days(y,w){
                    var x  = new Date(y,w,0).getDate();
                    return x;
                }
                this.ft = [];
                this.ct = [];
                this.at = [];
                let w = this.week-1,y = this.year;
                let one = weeks(y,w,1);
                let front = 0;
                let after = 0;
                w == 0?front = days(y-1,11):front = days(y,w);
                w == 11?after = days(y+1,0):after = days(y,w+1);
                // 开头
                if(one != 0){
                    let c = front-one;
                    let num = 0;
                    for(let i = front;i>c;i--){
                        this.ft[num] = i;
                        num++;
                    }
                    this.ft.reverse()
                }
                // 本月
                for(let i=0;i<days(this.year,this.week);i++){
                    this.ct[i] = i+1;
                }
                // 末尾
                var lengths = this.ft.length+this.ct.length;
                if(lengths != 42){
                    for(let i = 0;i<42-lengths;i++){
                        this.at[i] = i+1;
                    }            
                }
                this.btn = true;
                this.$store.commit("switchSeen",{seen:true});
            },
            myday:function(day){
                let now = new Date();
                this.day = day;
                if(this.year*10000+this.week*100+this.day>=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate()){
                    this.$store.commit("modDate",{date:this.year +"-"+ this.week+ "-" + this.day});
                }else{
                    alert("请输入正确的截止日期")
                    return false;
                }
                this.btn = false;
            },
        },
        watch:{
            seen:function(newValue,oldValue){
                this.btn = newValue;        
            }
        }
}
function getToDay(){
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth()+1;
    var nowDate = now.getDate();
    return nowYear+"-"+nowMonth+"-"+nowDate;
}
</script>
<style>
.date {
    margin: 10px 30px 40px 30px;
    display: inline-block;
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
    background: #337AB7;
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
</style>