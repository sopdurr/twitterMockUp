import { useState } from "react";



const useLike = (url, id) => {
  
  const likeInfo = {
    userId: 1,
    tweetId: id
  };
  const [state, setState] = useState(likeInfo);
  const { userId, tweetId } = state;

  const addLike = () => {
    fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(likeInfo),
  }).then((result) => {
    console.log(result);
    setState({...state,
      userId, tweetId
    })
  });
  }
  return {addLike}
}

export default useLike;