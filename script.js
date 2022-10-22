//Constant
const HTML_Elements_Td = document.getElementsByTagName("td")
const HTML_Element_Visible_Handler = document.getElementById("visible_handler")
const TURN_FORMAT = ["O", "X"]

//Variable
let boxes_list = []
let boxes_sorted_list = []
let current_turn = 0
let last_drawed_pos = [-1, -1]

//Class
class Box {
    constructor(element, x, y) {
        this.element = element
        this.pos = [x, y]
        //클릭 이벤트 추가
        this.element.addEventListener("click", () => {
            //해당 칸이 비어있다면
            if (this.Content == "") {
                //O나 X를 표기한다
                this.setContent(TURN_FORMAT[current_turn])
                //마지막으로 그린 위치
                last_drawed_pos = this.pos
            }
            finishTurn()
        })
    }
    setContent(text) {
        this.element.textContent = text
    }
    get Content() {
        return this.element.textContent
    }
}

//Function
//초기화
function init() {
    let x = 0
    let y = 0
    for (var i = 0; i < HTML_Elements_Td.length; i++) {
        boxes_list.push(new Box(HTML_Elements_Td[i], x, y))
        x++
        if (x > 2) {
            x = 0
            y++
        }
    }

    boxes_sorted_list.push(boxes_list.slice(0, 3))
    boxes_sorted_list.push(boxes_list.slice(3, 6))
    boxes_sorted_list.push(boxes_list.slice(6, 9))
}

//턴 끝내기
function finishTurn() {
    if (isWinSomeone()) {
        HTML_Element_Visible_Handler.style.display="block"
    }
    changeTurn()
}

//가로 방향 확인
function checkRow() {
    let last_mark = TURN_FORMAT[current_turn]
    for (var i = 0; i < 3; i++) {
        let tasking_box = boxes_sorted_list[last_drawed_pos[1]][i]
        if (last_mark !== tasking_box.Content) {
            return false
        }
        last_mark = tasking_box.Content
    }
    return true
}

//세로 방향 확인
function checkColumn() {
    let last_mark = TURN_FORMAT[current_turn]
    for (var i = 0; i < 3; i++) {
        let tasking_box = boxes_sorted_list[i][last_drawed_pos[0]]
        if (last_mark !== tasking_box.Content) {
            return false
        }
        last_mark = tasking_box.Content
    }
    return true
}

//대각선 방향 확인(y=x)
function checkIdentity() {
    let last_mark = TURN_FORMAT[current_turn]
    for (var i = 0; i < 3; i++) {
        let tasking_box = boxes_sorted_list[i][2 - i]
        if (last_mark !== tasking_box.Content) {
            return false
        }
        last_mark = tasking_box.Content
    }
    return true
}

//대각선 방향 확인(y=-x)
function checkMinusIdentity() {
    let last_mark = TURN_FORMAT[current_turn]
    for (var i = 0; i < 3; i++) {
        let tasking_box = boxes_sorted_list[i][i]
        if (last_mark !== tasking_box.Content) {
            return false
        }
        last_mark = tasking_box.Content
    }
    return true
}

//승리 여부 체크
function isWinSomeone() {
    if (checkRow() || checkColumn()) {
        return true
    } else if (checkIdentity() || checkMinusIdentity()) {
        return true
    }
    return false
}

//턴 바꾸기 O->X, X->O
function changeTurn() {
    if (current_turn == 0) {
        current_turn = 1
    } else {
        current_turn = 0
    }
}

init()