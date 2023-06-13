import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { RoleList } from 'src/App';
import { useAuth } from 'src/auth';

export const editJobRoles = [RoleList.EvocsInternal, RoleList.Admin];
export const deleteJobRoles = [RoleList.EvocsInternal, RoleList.Admin];

const DELETE_JOB_MUTATION = gql`
  mutation DeleteJobMutation($id: Int!) {
    deleteJob(id: $id) {
      id
    }
  }
`;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const _checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const Job = ({ job }) => {
  const { hasRole } = useAuth();

  const [deleteJob] = useMutation(DELETE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job deleted');
      navigate(routes.jobs());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete job ' + id + '?')) {
      deleteJob({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Job {job.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{job.id}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(job.status)}</td>
            </tr>
            <tr>
              <th>Initiating user id</th>
              <td>{job.initiatingUserID}</td>
            </tr>
            <tr>
              <th>Product id</th>
              <td>{job.productID}</td>
            </tr>
            <tr>
              <th>Result blob</th>
              <td>{jsonDisplay(job.resultBlob)}</td>
            </tr>
            <tr>
              <th>Result url</th>
              <td>{job.resultURL}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(job.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(job.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {hasRole(editJobRoles) && (
          <Link
            to={routes.editJob({ id: job.id })}
            className="rw-button rw-button-blue"
          >
            Edit
          </Link>
        )}
        {hasRole(deleteJobRoles) && (
          <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(job.id)}
          >
            Delete
          </button>
        )}
      </nav>
    </>
  );
};

export default Job;
