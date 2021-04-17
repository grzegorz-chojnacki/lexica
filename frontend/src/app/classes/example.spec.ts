import { ChoiceTest, Example, MultiTest, SimpleCard } from './example'
import { ChoiceTestTask, MultiTestTask, SimpleCardTask } from './task-type'
import { simpleCards, choiceTests, multiTests } from 'src/app/test-data'

describe('Example', () => {
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
    it('should validate SimpleCard example', () => {
      expect(SimpleCard.validate(simpleCards[0])).toBeTrue()
    })

    it('should validate invalid SimpleCard examples', () => {
      const examples = [
        { },
        { nativeWord: '' },
        { foreignWord: '' },
        new SimpleCard('', ''),
        new SimpleCard('A', ''),
        new SimpleCard('', 'B'),
      ]
      expect(examples.find(SimpleCard.validate)).toBeFalsy()
    })
  })

  describe('ChoiceTest', () => {
    it('should validate ChoiceTest example', () => {
      expect(ChoiceTest.validate(choiceTests[0])).toBeTrue()
    })

    it('should validate invalid ChoiceTest examples', () => {
      const examples = [
        { },
        { question: '' },
        { answer: '' },
        { decoys: [] },
        { question: 'Q', answer: 'A', decoys: 'D' },
        new ChoiceTest('', '', []),
        new ChoiceTest('Q', '', []),
        new ChoiceTest('', 'B', []),
        new ChoiceTest('', 'B', []),
      ]
      expect(examples.find(ChoiceTest.validate)).toBeFalsy()
    })
  })

  describe('MultiTest', () => {
    it('should validate MultiTest example', () => {
      expect(MultiTest.validate(multiTests[0])).toBeTrue()
    })

    it('should validate invalid MultiTest examples', () => {
      const examples = [
        { },
        { question: 'Q' },
        { answer: ['A'] },
        { decoys: ['D'] },
        { question: 'Q', answer: 'A', decoys: 'D' },
        new MultiTest('', [], []),
        new MultiTest('Q', [], []),
        new MultiTest('', ['B'], []),
        new MultiTest('', ['B'], []),
      ]
      expect(examples.find(MultiTest.validate)).toBeFalsy()
    })
  })
})
