import { useEffect } from 'react'
import Router from 'next/router';
// import Image from 'next/image'

export default function Home() {
  /* UseEffect hook to perform automatic
  / redirect to component in url /test/jobs
  / when component is mounted */
  useEffect(function () {
    const { router: { asPath } } = Router;
    if (asPath === '/') {
      Router.push('/test/jobs');
    }
  }, []);

  return <></>;
}
