import { ChoiceTest, Example, MultiTest, SimpleCard } from './example'
import { ChoiceTestTask, MultiTestTask, SimpleCardTask } from './task-type'
import { simpleCards, choiceTests, multiTests } from 'src/app/test-data'

fdescribe('Example', () => {
  it('should parse SimpleCard examples', () => {
    const input = JSON.stringify(simpleCards)
    const [output, taskType] = Example.parse(input)
    expect(taskType).toBe(SimpleCardTask)
    expect(JSON.stringify(output)).toEqual(input)
  })

  it('should parse ChoiceTest examples', () => {
    const input = JSON.stringify(choiceTests)
    const [output, taskType] = Example.parse(input)
    expect(taskType).toBe(ChoiceTestTask)
    expect(JSON.stringify(output)).toEqual(input)
  })

  it('should parse MultiTest examples', () => {
    const input = JSON.stringify(multiTests)
    const [output, taskType] = Example.parse(input)
    expect(taskType).toBe(MultiTestTask)
    expect(JSON.stringify(output)).toEqual(input)
  })

  it('should not parse garbage data', () => {
    const original = [{ foreignWord: 'A'}, { nativeWord:  'B'}]
    expect(() => Example.parse(JSON.stringify(original))).toThrow()
  })

  it('should not parse mixed task types', () => {
    const mixed = [simpleCards[0], choiceTests[0]]
    expect(() => Example.parse(JSON.stringify(mixed))).toThrow()
  })

  describe('SimpleCard', () => {
    it('should create', () => {
      const example = new SimpleCard('A', 'B')
      expect(example).toBeTruthy()
    })
  })

  describe('ChoiceTest', () => {
    it('should create', () => {
      const example = new ChoiceTest('Q', 'A', ['D1', 'D2'])
      expect(example).toBeTruthy()
    })
  })

  describe('MultiTest', () => {
    it('should create', () => {
      const example = new MultiTest('Q', ['A1', 'A2'], ['D1', 'D2'])
      expect(example).toBeTruthy()
    })
  })
})
