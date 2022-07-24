import React, { useMemo } from 'react';
import { useParams } from "react-router-dom";

import AppHeader from '../app-header';
import InvestmentDetail from '../investment-detail';

import { useInvestments, useHistory, useInOut, useReport } from '../../hooks';

const compute_investment_detail = (history, inout, id, report) => {
    const investment_detail_item = {};
    const investment_detail_total = {history: null, 
                                     sum_in: 0, 
                                     sum_out: 0, 
                                     sum_plan: 0, 
                                     sum_delta_rub: 0,
                                     sum_delta_proc: 0,
                                     ratio_deposit_index: 0};

    history.forEach((element) => {        
        if (element.investment_id === parseInt(id)) {
            const date = element.date.slice(0,7);                
            investment_detail_item[date] = {history: element.sum}
            investment_detail_total.history = element.sum;
        }
    });
    
    inout.forEach((element) => {        
        if (element.investment_id === parseInt(id)) {
            const date = element.date.slice(0,7);                              
            if (!(date in investment_detail_item)) {
                investment_detail_item[date] = {history: null}
            }
            if (!investment_detail_item[date].sum_in) {
                investment_detail_item[date].sum_in = 0;
            }
            if (!investment_detail_item[date].sum_out) {
                investment_detail_item[date].sum_out = 0;
            }
            if (element.sum >= 0) {                                        
                investment_detail_item[date].sum_in += element.sum;
                investment_detail_total.sum_in += element.sum;
            } else {
                investment_detail_item[date].sum_out += -1 * element.sum;
                investment_detail_total.sum_out += -1 * element.sum;
            }                    
        }
    });

    report.forEach((report_element) => {               
        if (report_element.id === parseInt(id)) {            
            for (let element in report_element.sum_plan) {                
                if (element in investment_detail_item) {
                    investment_detail_item[element].sum_plan = report_element.sum_plan[element];
                    investment_detail_total.sum_plan = report_element.sum_plan[element];
                }                
            }

            for (let element in report_element.sum_delta_rub) {                
                if (element in investment_detail_item) {
                    investment_detail_item[element].sum_delta_rub = report_element.sum_delta_rub[element];
                    investment_detail_total.sum_delta_rub = report_element.sum_delta_rub[element];
                }                
            }

            for (let element in report_element.sum_delta_proc) {                
                if (element in investment_detail_item) {
                    investment_detail_item[element].sum_delta_proc = report_element.sum_delta_proc[element];
                    investment_detail_total.sum_delta_proc = report_element.sum_delta_proc[element];
                }                
            }

            for (let element in report_element.ratio_deposit_index) {                
                if (element in investment_detail_item) {
                    investment_detail_item[element].ratio_deposit_index = report_element.ratio_deposit_index[element];
                    investment_detail_total.ratio_deposit_index = report_element.ratio_deposit_index[element];
                }                
            }
        }
    });

    const investment_detail_item_sorted = Object.keys(investment_detail_item).sort().reduce(
        (obj, key) => { 
            obj[key] = investment_detail_item[key]; 
            return obj;
        }, {});

    return { investment_detail_item: investment_detail_item_sorted, 
             investment_detail_total };
}


const InvestmentDetailPage = () => {

    const { id } = useParams();

    const { investments, loading: loadingInvestments, error: errorInvestments, deactivateInvestment} = useInvestments(id);
    const { history, loading: loadingHistory, error: errorHistory, addHistory } = useHistory(id)
    const { inout, loading: loadingInOut, error: errorInOut, addInOut } = useInOut(id)
    const { report, loadingReport, errorReport, getJSONReport } = useReport();

    const { description, is_active } = useMemo(() => {

        try {
            const investment_item = investments.filter((investment_item) => 
                                                        investment_item.id === parseInt(id));

            return { description: investment_item[0].description, 
                     is_active: investment_item[0].is_active }
            
        } catch {
            return { description: "Мои.Инвестиции", 
                     is_active: undefined }
        }
        
    }, [investments, id])

    const { investment_detail_item, investment_detail_total } = useMemo(() =>         
        compute_investment_detail(history, inout, id, report)
    , [history, inout, id, report])

    return (
        <>               
            <AppHeader name={description} />    
            <InvestmentDetail id={id} 
                              investment_detail_item={investment_detail_item}
                              investment_detail_total={investment_detail_total}
                              deactivateInvestment={deactivateInvestment} 
                              is_active={is_active}
                              loadingInvestments={loadingInvestments}
                              errorInvestments={errorInvestments}
                              loadingHistory={loadingHistory}
                              errorHistory={errorHistory}
                              addHistory={addHistory}                              
                              loadingInOut={loadingInOut} 
                              errorInOut={errorInOut}
                              addInOut={addInOut}                              
                              loadingReport={loadingReport}
                              errorReport={errorReport}
                              getJSONReport={getJSONReport}
            />
        </>
    )
};

export default InvestmentDetailPage;
