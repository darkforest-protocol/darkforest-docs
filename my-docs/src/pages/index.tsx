import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

// Redirect to the docs
export default function Home(): React.ReactElement {
  const history = useHistory();
  
  useEffect(() => {
    history.replace('/intro');
  }, [history]);
  
  return null;
}
