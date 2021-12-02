import Item from './Item'

// const itemArr = [1,2,3];

// 透過 listData屬性 傳入data
const List = ({listData, deleteData}) => {
    // 透過listData 將data傳入

    console.log("List.js")

    // console.log(listData) // data內容
    return <div className="List">
    {/*
        { // 如果要在JSX使用JS需要用{}包裹起來
            itemArr.map(item => <div>{item}</div>) // div內的item如果沒用{}包起來會變成純粹的字串
        }
    */}
    {   
        // 不希望元件被重新渲染就要加KEY，或陣列順序有所更動就要加KEY
        // KEY不能為index，若陣列抽出其中一個元素index就會不準確
        // listData.map(item => <Item key = {item}/>)
        listData.map(item => {
            console.log(item) // Object

            // 看看被JSON.stringify後的樣子
            let buf = item
            console.log(JSON.stringify(buf)) //{"id":"0001","note":"serverNote","date":"2021/20/21","time":"20:21"}
            console.log(JSON.stringify({buf})) //{"buf":{"id":"0001","note":"serverNote","date":"2021/20/21","time":"20:21"}}


            // 創造一個新的物件接收item內容，相當於每次map都新建立一個物件來複製item，當然也可以不要用const而直接return 內使用item.xxx
            // 用{}方式去接收一個物件時，會對應物件的key值與內容
            // 結果會是 note = item.note; date = item.date; .etc (物件解構賦值的簡易寫法)
            const {note, date, time, id} = item

            // 左邊為屬性，右邊為上面接收item的const內容值
            // 注意 {id}有兩個是因為Item不能直接存取key屬性，這是系統規定
            return <Item id = {id} note = {note} date = {date} time = {time} key = {id} deleteData = {deleteData}/>
        })
    }

    </div>
}

export default List