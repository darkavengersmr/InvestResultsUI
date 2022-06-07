import React from 'react';
import { InvestResultsServiceConsumer } from '../invest-results-service-context';

const withInvestResultsService = () => (Wrapped) => {

  return (props) => {
    return (
      <InvestResultsServiceConsumer>
        {
          (investResultsService) => {
            return (<Wrapped {...props}
              investResultsService={investResultsService}/>);
          }
        }
      </InvestResultsServiceConsumer>
    );
  }
};

export default withInvestResultsService;
