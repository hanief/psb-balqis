import { ulid } from 'ulid'

export function getRandomString() {
  return ulid()
}

export function getRandomInteger(min = 10000, max = 100000) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}