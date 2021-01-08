import React from 'react';

class Nominations extends React.Component
{
  render ()
  {
    return (
      <div className = "col-lg-6">
        <h2>Your Shoppie Nominations</h2>
        <div className = "nominations container">
          <div className = "row">
            <div className = "col-sm-4 nom-holder"> {/* Nomination 1 */}
              <div className = "nomination">
              </div>
            </div>
            <div className = "col-sm-4 nom-holder"> {/* Nomination 2 */}
              <div className = "nomination">
              </div>
            </div>
            <div className = "col-sm-4 nom-holder"> {/* Nomination 3 */}
              <div className = "nomination">
              </div>
            </div>
          </div>
          <div className = "row">
            <div className = "col-sm-2"></div>
            <div className = "col-sm-4 nom-holder">  {/* Nomination 4 */}
              <div className = "nomination">
              </div>
            </div>
            <div className = "col-sm-4 nom-holder">  {/* Nomination 5 */}
              <div className = "nomination">
              </div>
            </div>
            <div className = "col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nominations;
