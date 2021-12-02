

// 透過屬性得到對應內容，每一次新增都會重新跑一次Item.js創造新的item
const Item = ({note,date,time,id,deleteData}) => {

    console.log("Item.js")
    
    function removeItem(){
        // 根據useState理解，若setState傳入內容為function，將會自動傳入當下state，故prev自動傳入state也就是data
        deleteData(function (prev){
            console.log("exeuting deleteData")
            prev.forEach(element => {
            });
            // ES6 新增filter，將陣列逐個帶入，並過濾，若true則放回陣列，flase則不放回陣列
            return prev.filter(item => item.id !== id)
        })
    }
    
    return <div className="item">
    <div>
        <p>{note}</p>
        <p>{date}{time}</p>
    </div>
    <button onClick={removeItem} className="remove" >移除</button>
    </div>
}

export default Item