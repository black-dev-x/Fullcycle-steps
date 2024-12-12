import { getSession } from '@/utils/session'
import { revalidatePath } from 'next/cache'
import Link from 'next/link';

const getProjects = async () => {
  const session = await getSession()
  const response = await fetch('http://localhost:8000/projects', { headers: { Authorization: `Bearer ${session.token}` } });
  return response.json()
}
const addProjectAction = async (form: FormData) => {
  'use server';
  const name = form.get('name') as string;
  const session = await getSession()
  await fetch('http://localhost:8000/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ name }),
    });
  revalidatePath('/dashboard')
}

const DashboardPage = async () => {
  const projects = await getProjects();
  const projectId = '1';

  return (
    <div className='m-4'>
      <h1 className='text-2xl font-bold mb-4'>Projects</h1>
      <ul className='space-y-2'>
        {projects.map((project: any) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}/tasks`} className='text-blue-600 underline'>
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
      <form action={addProjectAction} className='mt-4 space-y-2'>
        <div>
          <label>Name</label>
          <input name='name' type='text' className='border p-2 w-full' />
        </div>
        <button type='submit' className='bg-green-500 text-white px-4 py-2'>
          Add Project
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;