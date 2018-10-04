import React from 'react';
import { Badge, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import moment from 'moment';

const Story = (props) => {
  
  let url = props.url || `/item/${props.id}`;

  return (
     <ListGroupItem className="bg-dark">
      <a href={url}><ListGroupItemHeading>{props.title}</ListGroupItemHeading></a>
      <ListGroupItemText>
        <Badge color="info">{props.score}</Badge> points by {props.by} {moment(props.time*1000).fromNow()}<span className="float-right">{props.descendants > 0 && <a href={`/item/${props.id}#comments`}>comments</a>}</span>
      </ListGroupItemText>
    </ListGroupItem>
  )
}

export default Story;
