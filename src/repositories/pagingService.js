import Page from '../lib/page';
import ByRegion from '../components/byRegion';
import ByTime from '../components/byTime';

const pagesMapping = { byRegion: ByRegion, byTime: ByTime };

export default new Page(pagesMapping);
