import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries';

function CompanyPage() {
  const { companyId } = useParams();
  const [ company, setCompany ] = useState([]);

  useEffect(() => {
    getCompany(companyId).then(resp => setCompany(resp));
  }, [companyId]);

  if(company.length <= 0){
    <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h1 className='title'>Jobs</h1>
    </div>
  );
}

export default CompanyPage;
