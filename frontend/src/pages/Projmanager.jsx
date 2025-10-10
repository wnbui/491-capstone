import { Layout } from '../Layout';

export const ProjectManager = () => {
  return (
    <Layout pageTitle="PROJECT MANAGER">
    <div>
            <table>
            <tbody>
            <tr>
            <td>To Do<br /><a href="#">+ Add New</a></td>
            <td>In Progress<br /><a href="#">+ Add New</a></td>
            <td>Finished<br /><a href="#">+ Add New</a></td>
            </tr>
            </tbody>
            </table>
    </div>
     </Layout>
  );
};