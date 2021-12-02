// import React from 'react'; 最新版react已經不用手動import了
import { useState,useEffect } from 'react'

import Edit from './components/Edit'
import List from './components/List'
import './index.css'
import {API_GET_DATA} from "../../global/constant"


// 非同步函式
async function fetchData(setData){
    // 利用fetch來"GET"資料
    // await 來一步步執行
    const res = await fetch(API_GET_DATA)
    const dataBuf = await res.json()
    // 將dataBuf物件對應key值data的內容給const data (物件解構賦值的簡易寫法)
    const {data} = dataBuf
    console.log(data) // Array
    setData(data)
    console.log("GET",data)
}

async function fetchSetData(data){
    await fetch (API_GET_DATA,{
        //copied from MDN
        // 記得是{data}，因把他包成元素放入才會是{"data" : [{}..{}..{}..]}格式，若沒有{}則是{[...]}
        body: JSON.stringify({data}), // must match 'Content-Type' header
        // cache: 'no-cache', // *default, no-cache, reload, force-cache,  only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'PUT' // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, cors, *same-origin
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // *client, no-referrer
    })
    console.log("put",data)
}

const Home = () => {

    console.log("Home.js")

    /*
        const [state, setState] = useState(initialState)

        傳一個 state 的值，以及更新 state 的 function，這個function類似於 state = return [parameter]
        其中state會被宣告，而值為initialState
        且這個function為callback function (最後執行)
        若 setState 傳入的值為function 會立即執行且自動傳入 state 並更新state
    */
    const [data, setData] = useState([])

    /*
    useEffect 就是綁定一個會改變的、會被渲染的元素(通常那個元素都使用useState進行渲染上的綁定，當然也可以只是普通變數，沒有useState綁定)，當該元素被重新渲染時會執行useEffect內容

    1.若useEffect和data綁定，當data被重新渲染時，或綁定變數變動時執行內容；通常useEffect內部函式會用到的變數都會合useEffect做綁定

    2.若useEffect內容的函式有return 另一個函式，則代表被return的函示會在下一次執行原函式之前被執行，故可以用來清除綁定的值，使useEffect停止動作

    3.若useEffect不綁定東西，則代表他會在每次渲染時執行(前提是要有執行到這個文件，就像輸入記事改變的時候Edit.js一直被重新渲染卻沒觸發這邊的useEffect)
    */
    useEffect(() => {
        // window.alert("新增成功")
        /*
        fetch 會向指定url索取資料，並回傳資料
        // fetch("http://localhost:3000/posts/1")
        因為要fetch的內容有些是固定的，所以在global資料夾中constant.js進行優化
        // fetch(API_GET_DATA)
        .then() 會將執行此方法的元素傳入，並回傳物件，有點類似map的運作方式，但功能不同
        // .then(res => res.json())
        // .then(data => {
            // console.log(data);
        // })

        上述因大量使用callback function，會有效能上的問題，故利用async來解決
        */
        fetchData(setData)
        // return () =>{
             // window.alert("useEffect的return函式")
        // }
    },[])

    // 當data改變時，要PUT給伺服器，由於要正確使用Hook的觀念，故不在"新增"這個按鈕上面做onclick來post資料，這不符合Hook的概念，盡量都用useEffect和useState來控制

    useEffect(() => {
        fetchSetData(data)
    },[data])



    return <div className="app">

        <Edit add = {setData}/>
        {/*
            add與listData 為屬性
        */} 
        <List listData = {data} deleteData = {setData}/> 
    </div>
}

export default Home


/*
                            Home
      props add as setData /    \ props listData,remove as data,setdata
                        Edit   List
                                | props note,date,time,remove as note,date,time,set
                               Item
                               
                               



Home : 負責顯示主頁面，主頁面又被切割為 Edit 與 List，並將setData交給Edit； data交給List

Edit : 為頁面上半部，負責對 input 和 button 進行控制，持有setData可對data的改變進行控制，理由是因為 Edit 方便取得 input值 ，又因 button click event也在這邊，故讓其持有setData

List : 為顯示data的容器，同時也負責data的整合串接(每個item的串接)，故持有data，並將input資料傳給Item，而刪除按鈕在Item也就是List底下，故將setData也交給List再讓List交給Item

Item : 新增項目的基礎架構，為data陣列的各個內容，每一個item都是一個物件，而為了渲染這些物件，必須向List取得input的各個資料。因刪除按鈕在各個Item裡面，故刪除動作button click event也在這邊，故向List取得setData控制並刪除data某些內容
                               
                               
*/