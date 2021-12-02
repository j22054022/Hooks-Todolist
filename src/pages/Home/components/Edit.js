import {useState} from 'react'
import {v4} from 'uuid'

const Edit = ({add}) => {

    console.log("Edit.js")

    // 透過 add屬性 將 setData傳入

    /* 嘗試使用 styled componenets 但遇到 "-"字符出問題，通常會將連接-後面那個英文變大寫蘭解決這個問題
    const edit = {
        container : {
            display : "flex",
            // justify-content : "column"
        }

    }

    return <div style = {edit.container}>
        
    </div>
    */
    
    // 將input 雙向綁定，若沒有onChange，因綁定關係，就算鍵入內容畫面也不會渲染
    const [note,setNote] = useState("")

    const [date,setDate] = useState("")

    const [time,setTime] = useState("")

    // 傳入事件
    function noteChange(e){
        // 觸發這個事件的目標的值
        setNote(e.target.value)
    }

    function dateChange(e){
        setDate(e.target.value)
    }

    function timeChange(e){
        setTime(e.target.value)
    }
    
    function addItem(){
        add(function(prevData){ // 根據useState理解，若setState傳入內容為function，將會自動傳入當下state，故prevData自動傳入state也就是data

            // ...為展開運算符(Spread Operator)，其實就相當於把原陣列各個容器拆開放入新陣列
            return [...prevData,
                // 這裡在陣列後方新增物件，並回傳代替原本陣列
                { 
                id:v4(),
                note, 
                date,
                time
            }]          
        })

    }

    return <div className="Edit_container">
        <h1>備忘錄</h1>
        <p>記事 : </p>
        {
            // onChange 為 JS內建事件，當標籤內容改變時觸發
        }

        <input type="text" value={note} onChange={noteChange}></input>
        <p>日期 : </p>
        <input type="date" value={date} onChange={dateChange}></input>
        <p>時間 : </p>
        <input type="time" value={time} onChange={timeChange}></input>
        <button onClick={addItem} className="add">新增</button>
    </div>
}

export default Edit