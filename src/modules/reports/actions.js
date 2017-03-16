export const LOAD_REPORT = 'LOAD_REPORT';
export const RECEIVE_REPORTS = 'RECEIVE_REPORTS';
export const UPDATE_REPORT = 'UPDATE_REPORT';

export function loadReport(report) {
  return {
    type: LOAD_REPORT,
    payload: report
  }
};

export function receiveReports(reports) {
  return {
    type: RECEIVE_REPORTS,
    payload: reports
  };
}

export function updateReport(report) {
  return {
    type: UPDATE_REPORT,
    payload: report
  };
}
