export const useActionWithinTime = () => {
  const scheduleAction = (action: () => void, intervals: number[]) => {
    const intervalFloor = intervals[0]
    const intervalCeil = intervals[1]

    if (intervalFloor >= intervalCeil) {
      return
    } else {
      setTimeout(function () {
        action()
      }, intervalCeil - intervalFloor)
    }
  }

  return { scheduleAction }
}
