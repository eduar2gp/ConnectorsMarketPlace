import { SearchpipePipe } from './searchpipe.pipe';

var mockProducts = [
  { id: 11, name: 'Account Verification' },
  { id: 12, name: 'Alternative Employment and Income Data' },
  { id: 13, name: 'AML Connect' },
  { id: 14, name: 'Automated Data View' },
  { id: 15, name: 'Bank Transaction Data' },
  { id: 16, name: 'Consumer Credit Report' },
  { id: 17, name: 'Consumer Engagement Suite' },
  { id: 18, name: 'Digital Identity Trust' },
  { id: 19, name: 'Document Verification' },    
  { id: 20, name: 'FraudIQ® Identity Scan Alert' }
];
let filterPipe: SearchpipePipe;

describe('SearchpipePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchpipePipe();
    expect(pipe).toBeTruthy();
  });
  beforeEach(() => {
    filterPipe = new SearchpipePipe();
  });

  it('should be instanciated', () => {
    expect(filterPipe).toBeDefined();
  });


  it('should transform', () => {
    const pipe = new SearchpipePipe();
    expect(pipe.transform([], 'Account', 'name')).toEqual([]);
    expect(pipe.transform(mockProducts, '','name')).toEqual(mockProducts);
    expect(pipe.transform(mockProducts, 'A','name')).toEqual(mockProducts);
  });


  it('should return empty array if no items are given', () => {
    const items = null;

    const filtered = filterPipe.transform(mockProducts, 'name', 'Account');

    expect(filtered.length).toBe(0);
    expect(filtered).toEqual([]);
  });


  it('should return items if no field is given', () => {
    const items = [];
    items.push({ id: 1, name: 'Account' });

    const filtered = filterPipe.transform(items, '', 'Account');

    expect(filtered).toEqual(items);
  });


  it('should filter correctly', () => {
    const items = [];

    items.push({ id: 1, name: 'Account' });
    items.push({ id: 2, name: 'Bank' });
    items.push({ id: 3, name: 'API' });
    items.push({ id: 4, name: 'Equifax' });

    const filtered = filterPipe.transform(items, 'Bank', 'name');

    expect(filtered.length).toBe(1);
  });


  it('should filter multiple items', () => {
    const items = [];

    items.push({ id: 1, name: 'Bank' });
    items.push({ id: 2, name: 'Bank' });
    items.push({ id: 3, name: 'Account' });
    items.push({ id: 4, name: 'Equifax' });

    const filtered = filterPipe.transform(items, 'Bank', 'name');

    expect(filtered.length).toBe(2);
  });



});
