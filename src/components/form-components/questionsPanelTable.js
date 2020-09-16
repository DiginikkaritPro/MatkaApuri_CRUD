import React from 'react'

const QuestionsPanelTable = (props) => {

    const createTableRow = (questionTxt, questionId, index) => {
        return(
            <tr>
                <th scope="row">{index}</th>
                <td>
                    <a>
                        <button type="button" className="btn" onClick={() => props.editQuestionClick(questionId)}>{questionTxt}</button>
                    </a>
                </td>
                <td>
                    <a data-toggle="modal" href="#myModal">
                      <button type="button" className="btn panelBtn">x</button>
                    </a>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title">Poista kysymys</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                            <p>Haluatko varmasti poistaa tämän kysymyksen ja sen 
                                jatkokysymykset?</p>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => props.deleteQuestionClick(questionId)}>Poista</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Sulje</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    const tableRows = [];

    if (props.questions && props.questions.length > 0) {
        let i = 1;
        props.questions.forEach(question => {
            tableRows.push(createTableRow(question.KysymysTXT, question.KysymysID, i));
            i++;
        });
    } else {
        tableRows.push(<p>Ei kysymyksiä</p>);
    }

    return (
        <div>
            <table className="table table-striped">
                <tbody>
                    {tableRows}
                </tbody>
            </table>            
        </div>
    )
}

export default QuestionsPanelTable;
