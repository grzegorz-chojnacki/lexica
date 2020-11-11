import { PercentagePipe } from './percentage.pipe'

const testValues = [ 0, 1.1, 12.3, 99.9, 100 ]

describe('PercentagePipe', () => {
  it('should create an instance', () => {
    const pipe = new PercentagePipe()
    expect(pipe).toBeTruthy()
  })

  it('should append % symbol', () => {
    const pipe = new PercentagePipe()
    testValues
      .map(pipe.transform)
      .forEach(output => expect(output.endsWith('%')).toBeTrue())
  })

  it('should round number to integer value', () => {
    const pipe = new PercentagePipe()
    testValues
      .map(pipe.transform)
      .forEach(output => expect(output).not.toContain('.'))
  })

  it('should add padding to the left to fill three digits', () => {
    const pipe = new PercentagePipe()
    testValues
      .map(pipe.transform)
      .forEach(output => expect(output.length).toEqual('100%'.length))
  })

  it('should format 12.3 to look like ` 12%`', () => {
    const pipe = new PercentagePipe()
    expect(pipe.transform(12.3)).toBe(' 12%')
  })
})
