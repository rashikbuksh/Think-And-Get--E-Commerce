const { app, ExecuteQuery } = require("../config");

const { read: JobEntry } = require("../api/job_entry");
const { read: RecordEntry } = require("../api/record_entry");

const GET_DATA = [...JobEntry, ...RecordEntry];

GET_DATA.forEach(({ uri, query, param }) => {
    app.get(uri, (req, res) => {
        if (param === undefined) {
            ExecuteQuery(res, query);
            return;
        }

        let paramArr = [];
        param?.forEach((val) => {
            paramArr.push(req?.params[val]);
        });

        ExecuteQuery(res, query, [...paramArr]);
    });
});
