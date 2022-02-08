import { useRoutes } from 'react-router-dom'
import { SignUp, SignIn, Main } from './Pages'
import { Toaster } from 'react-hot-toast'
import { CreateCategory, ShowCategory, UpdateCategory, BlankCategory } from './Pages/Category';
import { TaskDisplay, ShowTask, CreateTask } from './Pages/Task';
function App() {
  let element = useRoutes([
    { path: '/', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },

    {
      path: '/main', element: <Main />, children: [
        { path: '', element: <BlankCategory /> },
        { path: 'create', element: <CreateCategory /> },
        {
          path: ':category_id', element: <ShowCategory />, children: [
            { path: 'update', element: <UpdateCategory /> },
            { path: '', element: <TaskDisplay /> },
            { path: ':task_id', element: <ShowTask /> },
            { path: 'create', element: <CreateTask /> },

          ]
        },
      ]
    },
    // {
    //   path: '/main', element: <Main />,
    //   children: [
    //     { path: '', element: <IndexScreen /> },
    //     {
    //       path: ':category_id', element: <IndexTasks />, children:
    //         [
    //           { path: '', element: <AllTasks /> },
    //           { path: 'today', element: <TodaysTask /> },
    //           { path: 'updatecategory', element: <UpdateCategory /> },
    //           { path: 'taskcreate', element: <CreateTask /> },
    //           { path: ':task_id', element: <ShowTask /> }
    //         ]
    //     },
    //     { path: 'create', element: <CreateCategory /> }
    //   ]
    // }
  ])
  return (
    <>
      {element}
      <Toaster
        toastOptions={{
          className: 'w-auto h-[50px] text-[14px] p-3',
          position: 'bottom-center',
          style: {
            position: 'bottom-center'
          },
          success: {
            duration: 2000,
            theme: {
              primary: 'green',
              secondary: 'white'
            }
          },
          error: {
            duration: 2000,
            theme: {
              primary: 'red',
              secondary: 'white'
            }
          }
        }}
      />
    </>
  );
}

export default App;
