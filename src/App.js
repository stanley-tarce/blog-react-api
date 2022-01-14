import { useRoutes } from 'react-router-dom'
import { SignUp, SignIn, Main } from './Pages'
import { Toaster } from 'react-hot-toast'
import { CreateCategory, ShowCategory } from './Pages/Category';
function App() {
  let element = useRoutes([
    { path: '/', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    {
      path: '/main', element: <Main />, children: [
        { path: 'create', element: <CreateCategory /> },
        { path: ':category_id', element: <ShowCategory /> }
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
