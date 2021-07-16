## Login page 구성하기

### 2021-07-14

오늘은 `promis.all`을 이용해 비동기 병렬처리를 배웟고, `async - await`를 이용해서 비동기 처리를 동기화 하였으며 에러 처리도 깔끔하게 할 수 있게끔 하였습니다.

### 배운점

- 사실 로그인이라고 하면 굉장히 간단하고 쉬운 작업이라고들 생각을 많이 하게 되지만 고객편화적으로 깊게 들어가다보니 생각보다 쉽지도 않았으며 생각보다 얻는 점이 많았습니다.

- 이벤트 리스너 처리

  페이지 내 이벤트 리스너를 추가 하려할때 아직 페이지 내에 `HTMLelement`를 가지고 있지 않기 때문에 어떤 타이밍에 이벤트 리스너를 정의 해줘야 할까에 대한 고민을 한적이 있다. 이 프로젝트를 진행하면서 2가지 정도의 방법을 알아낼 수 있었습니다.

  1. 페이지 내에 `HTMLelement`가 생기는 `render`함수 내에 추가하는 방법
  2. `setTimeout`을 이용하여 비동기 처리의 특성을 이용해 이벤트 리스너를 처리하는 방법

  사실 뭐가 더 좋은 방법일지에 대해서는 조금 더 공부해 봐야 알 수 있지만 뭔가 브라우저 내에서 비동기 함수가 처리 되는 방식을 이해 할 수 있는 좋은 기회 였던것 같다.

- `async - await`을 이용한 비동기 처리

  비동기를 처리 할수 있는 방법은 굉장히 많다. 하지만 `콜백함수`로의 처리보다는 `프라미스`로의 처리가 더 가독성이 좋고 `프라미스`보다는 `async - await`방식이 더 가독성이 좋다고 생각한다.

  일단 `async -await`방식은 비동기 처리 방식이 아닌것 처럼 코드를 짤수 있기 때문에 코드 가독성이 매우 향상됩니다.

- `try - catch`를 이용한 에러 처리

  ```javascript
  const loadData = async () => {
    const END_POINT = 'https://randomuser.me/api/'
    return await fetch(END_POINT).then((res) => res.json())
  }
  
  const handle = (promise) => {
    return promise
      .then(res => ([res, undefined]))
      .catch(err => ([undefined, err]))
  }
  
  (async () => {
    try {
      const [data, err] = await handle(loadData())
      if (err) throw New Error('데이터를 불러오지 못했습니다.')
      console.log(data)
    } catch(err) {
      // 에러 처리
    }
  })()
  ```

  어떻게 하면 조금 가독성이 좋으면 각 `api`이용할때 마다 다른 처리방식을 보여 줄 수 있을지에 대해 고민하고 구글링을 해보았을때 제가 생각하기에는 이와 같은 방식이 어떤 api call에 대한 에러처리를 할 것인지에 대해 확연하게 보여준다고 생각하여 이와 같은 방법을 차용하였습니다.

- `promise.all()`

  api를 호출하다보면 한번에 여러 api를 호출해야하는 경우가 생기는데 `async - await`방식을 이용하면 쉽게 설계할 수 있지만 `promise.all`을 이용하면 여러 api를 병렬적으로 처리할 수 있고 하나의 api라도 실패하면 `promise.reject`를 리턴하기에 매우 핸들링 하기 쉬운 방식이라고 생각합니다.