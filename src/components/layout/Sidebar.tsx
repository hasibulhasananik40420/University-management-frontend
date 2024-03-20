import { Layout, Menu } from "antd";

import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
const {  Sider } = Layout;

 const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
 }


const Sidebar = () => {
  const user = useAppSelector(state=> state.auth.user)

 
 let sidebarItems 


 switch (user!.role) {
  case userRole.ADMIN:
    sidebarItems = sidebarItemsGenerator(adminPaths,userRole.ADMIN)
    break;

  case userRole.FACULTY:
    sidebarItems = sidebarItemsGenerator(facultyPaths,userRole.FACULTY)
    break;

  case userRole.STUDENT:
    sidebarItems = sidebarItemsGenerator(studentPaths,userRole.STUDENT)
    break;

  
 
  default:
    break;
 }

  return (
    <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
  >
    <div style={{color:'white',fontSize:'15px', height:'4rem',display:'flex', justifyContent:'center',alignItems:'center'}}>
      <h1>University</h1>
    </div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItems} />
  </Sider>
  )
}

export default Sidebar