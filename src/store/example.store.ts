import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

//기본 사용법 타입 에러는 일단 무시

let todoStore = (set) => ({
  todos: [],
  addTodo: (payload) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          text: payload.text,
          isCompleted: payload.isCompleted
        }
      ]
    })),

  deleteTodo: (payload) =>
    set((state) => ({
      todos: state.todo.filter((todo) => todo.id !== payload.id)
    })),

  completeTodo: (payload) =>
    set((state) => ({
      todos: state.todos.map((todo) -> {
        if(todo.id === payload.id){
          return {
            ...todo,
            isComplete : true
          }
        }
      })
    }))
});

// redux devtools처럼 chrome 확장자 앱 사용해서 사용가능
todoStore = devtools(todoStore);

// persist 새로고침시 데이터 유지
todoStore = persist(todoStore, {
  name: 'userStore'
});

//store 완성 다른 작업 필요없이 갖다쓰면됨
export const useTodoStore = create(todoStore);

// 예시
const {addTodo, deleteTodo ,completeTodo} = useTodoStore()

const handleAddTodo = () => {
  addTodo{
    text : 'Add Todo',
    isCompleted : false,
    id: 1
  }
}

const handleDeleteTodo = () => {
  deleteTodo{
    id : 1
  }
}

const handleCompleteTodo = () => {
  completeTodo{
    text : 'Add Todo',
    isCompleted : false,
    id: 1
  }
