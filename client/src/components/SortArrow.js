import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export default (sort, handleFunction) =>
  <span>
    { sort === 'down' ?
      <FontIcon
        className="material-icons"
        style={{ fontSize: '25px', cursor: 'pointer' }}
        onTouchTap={ handleFunction }
      >arrow_drop_down
      </FontIcon> :
      <FontIcon
        className="material-icons"
        style={{ fontSize: '25px', cursor: 'pointer' }}
        onTouchTap={ handleFunction }
      >arrow_drop_up
      </FontIcon>
    }
  </span>;
