const cheerio = require('cheerio');
const sluggify = require('../../slug');

const articleMap = [
  {
    title: 'Market History',
    image: 'https://img.highoilsoy.com/home-banner.jpg',
    teaser: 'When soybeans became a staple rotational row crop for U.S. farmers in the 1940s and 1950s, it kicked off a decades‐long effort by plant breeders to develop varieties with high‐demand traits.',
    body: `
      <p>When soybeans became a staple rotational row crop for U.S. farmers in the 1940s and 1950s, it kicked off a decades‐long effort by plant breeders to develop varieties with high‐demand traits.</p>
      <p>Since then, soybean oil has become a similar staple in consumer, commercial and industrial kitchens, and food processing facilities. Today it’s a key ingredient in many high‐demand food products, especially since partially hydrogenated soybean oil became popular in food manufacturing in the 1970s. While the aggregate demand for soybean oil has grown over the years, consumer appetites and attitudes toward “unhealthy fats” have changed, and that has opened doors for high oleic (HO) soybeans. Today, there are premium market opportunities for American farmers to deliver soybeans to local elevators, resulting in a strong domestic market. U.S. farmers have a huge opportunity, and responsibility to feed this growing demand.</p>
      <p>Quantity was the biggest demand‐driver in the soybean oil market, but in recent years that has begun to shift to quality. Today’s high oleic soybeans — those with higher oleic acid content that eliminates the need for hydrogenation, thus making them a healthier alternative to conventional soybeans when processed for vegetable oil — fill the supply needs, with the required attributes. The identity‐preserved varieties available to farmers today meet consumer demand for healthier cooking oil while offering competitive agronomic performance and a premium farm price. In short, today’s HO soybeans represents an opportunity for farmers to supply a domestic market they have created.</p>
      <p>As we enter the 2022 growing season, rising demand across the supply chain means HO soybeans represent a strong value proposition for growers, grain handlers, food processors and retailers as the supply chain coordinates throughout the system. The HO soybean value chain is built, now the chain needs a solid hook at the farm level with soybean growers consistently providing the supply food processors need to meet this demand.</p>
      <p>There are challenges for producers, however. Some are real. Some are merely perception, but they all must be overcome to keep this developed market a reality. Previously, as the market developed, myriad challenges persisted that limited growers’ ability and desire to accept this opportunity. Through the efforts of farmers, grain handlers, and other participants in the HO Soybean value chain, these challenges have been addressed.</p>
      <p>This paper explores the rising value of the quality‐based market for growers, including:</p>
      <ul>
      <li>An existing and growing demand that means this is a long‐term premium opportunity worthy of farmer consideration.</li>
      <li>The reality that these seed varieties hold as much or greater yield potential than conventional soybeans.</li>
      <li>That HO soybean growers have access to a range of widely available weed-control options.</li>
      <li>Requirements for these U.S. based contracts have more lenient protocols than traditional identity preservation handling procedures. These premium contracts require meeting only a minimum oleic content when delivered to the elevator.</li>
      <li>An understanding that food processors and distributers are committed to this market, see the long‐term market potential, and just need U.S. farmers to provide the products.</li>
      </ul>
    `,
    sections: ['why-high-oleic'],
  },
  {
    title: 'Market Outlook',
    image: 'https://img.highoilsoy.com/knowledge-5.jpg',
    teaser: 'Soybean oil has long been a major component of the consumer, industrial and commercial vegetable oil complex, but as end‐user preferences have shifted, a market for an oil with a desirable fatty acid composition has developed.',
    body: `
      <p>High Oleic Soy Market Outook</p>
      <p>Soybean oil has long been a major component of the consumer, industrial and commercial vegetable oil complex, but as end‐user preferences have shifted, a market for an oil with a desirable fatty acid composition has developed. Previously, that market relied mostly on canola or cottonseed oil, but preferences are changing. After years of research and field testing funded by the U.S. Soybean Checkoff, food companies are poised to increase demand with high oleic soybeans.</p>
      <p>The global cooking oil market, of which soybean oil is a major component, is expected to continue the demand surge that’s been underway for years. According to <a href="https://www.globenewswire.com/news-release/2018/07/17/1538399/0/en/Global-Cooking-Oil-Market-Will-Reach-USD-130-30-Billion-by-2024-Zion-Market-Research.html" target="_blank" rel="noopener">Zion Market Research</a> the worldwide cooking oil market was valued at more than $85 billion in 2017. That demand is expected to exceed $130 billion by 2024, with annual growth of more than 6%.</p>
      <p>The <a href="https://apps.fas.usda.gov/psdonline/circulars/oilseeds.pdf" target="_blank" rel="noopener">USDA Foreign Ag Service</a> says worldwide vegetable oil production from various oilseeds has grown from 188.41 million metric tons in 2016‐17 to a projected 213.9 million MT in the 2021‐22 marketing year. Soybean oil currently accounts for nearly 29% of total worldwide vegetable oil production, with U.S. soybean oil holding a 6% share of the world market. When whole soybean exports destined for overseas crush facilities are factored in, however, that total jumps to nearly 11% of the worldwide total vegetable oil market from United States‐produced soybeans.</p>
      <p>That share can continue escalating and it is poised for growth here at home.  There is a market in the United States for homegrown soybeans that provides a great opportunity for U.S. soybean farmers to build and maintain a premium market. There is domestic demand, it’s growing, and it promises to grow in the future.</p>
      <blockquote>
      <p>Asia Pacific dominated the Soybean Oil market in 2019 with a share of more than 44.12%, followed by North America owing to the increasing demand for Soybean oil for cooking purposes in a household. Increasing urbanization and the rise in the number of health-conscious consumers is increasing the growth of the soybean oil market in this region.</p>
      <p>North America is estimated to grow at a higher CAGR during the forecast period 2020‐2025 owing to the rising disposable income and an increase in the fermentation and drilling process. Increasing demand for soybean oil in the preparation of sauces, dressing, non‐dairy creamers, whipped toppings and increasing usage of soybean oil in fighting against conditions such as obesity, high cholesterol and cardiovascular disease is increasing the growth of the soybean oil market in this region.</p>
      <small><em>Source: Industry ARC; Soybean Oil Market – Forecast (2021 ‐ 2026)</em></small>
      </blockquote>
      <p>Consumers prefer the flavor and health benefits with minimal trans‐fatty acids (TFA) and saturated fat. Normally, the two are mutually exclusive; whenever hydrogenating a cooking oil source, TFAs decline but saturated fat and oxidative instability rise, as do adverse health effects of consuming partially hydrogenated oil, like increased risk of heart disease, stroke, and type‐2 diabetes.<sup>1</sup></p>
      <p>This is where real opportunity is for U.S. soybean farmers with high oleic soybean production to build, maintain, and grow a market with specifically desirable traits food processors, chefs and consumers prefer.</p>
      <p>At the same time, cooking oil made from HO soybeans with low linolenic acid levels perform on par with conventional cooking oils from a shelf‐stability standpoint, while low linolenic acid contents contribute to improve shelf stability and long‐term viability of the finished oil product.</p>
      <p>Once food companies discovered the value of HO soybeans, the fundamental changes necessary for them to begin manufacturing products with HO soybean oil didn’t happen immediately. That transition — one that’s taken five to seven years for many food manufacturers to adjust procedures, equipment and other components of the entire process — is nearing its end.</p>
      <p>Companies that eliminate TFAs in products are ready to begin using HO soybean oil. The marketplace is poised to connect growers and processors to these end‐users and their consumers. And now, the production side of the supply chain is almost a decade into developing the infrastructure and systems to deliver.</p>
      <p>With a growing market base in the United States, there is added benefit to American soybean farmers: U.S. producers have an opportunity to supply a stable and growing domestic market at U.S.‐based crush facilities. This means this localized market is less susceptible to foreign competition and potential international trade disputes because the market is U.S.-based and relies on U.S. produced crops. The soybeans are grown, processed, and sold to consumers right here at home.</p>
      <p>High oleic soybeans now represent the impetus for vegetable oil that’s the best of both worlds for the consumer. With limited seed supply in 2021, acreage increases are required to meet demand in 2022 and beyond.<sup>2</sup></p>
      <p><sup>1</sup> <em>Industry ARC; Soybean Oil Market – Forecast (2021 - 2026)</em><br/><sup>2</sup> <a href="https://www.feedandgrain.com/webinar/staying-ahead-of-the-high-oleic-soybean-curve">Staying Ahead of the High Oleic Soybean Curve</a> Feed&Grain Webinar, March 17, 2021</p>
      <p><small><em>This content is an excerpt of the High Oleic Soybean Oil: The Business and Agronomic Case to Meet Growing Demand white paper, Jan. 2022.</em></small></p>
    `,
    sections: ['why-high-oleic', 'market-analysis'],
  },
  {
    title: 'Top 10 Reasons To Grow High Oleic Soybeans',
    image: 'https://img.highoilsoy.com/top-10-reasons.jpeg',
    teaser: 'There is no better time than the present to add High Oleic Soybeans (HOSoy) to your crop management plan.',
    body: `
    <p>There is no better time than the present to add High Oleic Soybeans (HOSoy) to your crop management plan. However, if you're still not sure why you should plant HOSoy varieties, this list of the "Top 10 Reasons to Grow High Oleic Soybeans" is a good place to start.</p>
    <ol>
    <li><b>It's easier than you think - </b>There are no significiant agronomic changes needed when planting high oleic soybeans.</li>
    <li><b>No yield drag - </b>Genetics have improved, and yields are on par with traditional soybeans.</li>
    <li><b>Domestic demand - </b>It's project that more than 1 million acres of high oleic soybeans will need to be planted by 2022 to meet food processor demands</li>
    <li><b>Premium advantage - </b>Add more profit to your bottom line with a high oleic premium of up to $1/bushel, with the same yields as traditional soybeans.</li>
    <li><b>Double-crop opportunity — </b>Depending on where you farm, high oleic soybeans are an ideal option in a double-cropping management strategy.</li>
    <li><b>Easy-to-mange IP protocols - </b>Whether you use on-farm storage or direct delivery to the elevator, keeping your high oleic soybeans safe and segregated it simple.</li>
    <li><b>Seed availabe and more coming! - </b>You will have more HOSoy varieties and suppliers to choose from in time for the 2022 planting season.</li>
    <li><b>Realize profit potential (calculator) - </b>Visit <a href="https://soyinnovation.com/calculator" target="_blank" rel="noopener">soyinnovation.com/calculator</a> to compare the profit potential of raising HOSoy.</li>
    <li><b>Finding a market - </b>As demand for your HOSoy crop grows, so do your options to market those beans. Visit <a href="http://soyinnovation.com/location" target="_blank" rel="noopener">soyinnovation.com/location</a> to find the elevator nearest you.</li>
    <li><b>Available pest control strategies - </b>Visit <a href="https://iwilltakeaction.com/" target="_blank" rel="noopener">iwilltakeaction.com</a> for weed, insect and disease management strategies for HOSoy beans.</li>
    </ol>`,
    sections: ['why-high-oleic'],
  },
  {
    title: 'Marketing and Logistics',
    image: 'https://img.highoilsoy.com/knowledge-1.jpg',
    teaser: 'Marketing and logistics options exist throughout the trade area for 2021.',
    body: `
      <p>Marketing and logistics options exist throughout the trade area for 2021. Currently, three processors purchase HO soybeans from growers at a range of premiums based on how growers produce, market and store the crop throughout Indiana and Ohio, and the Delmarva/Pennsylvania region.</p>
      <p>With a processing facility in Salisbury, Maryland, and partnering with 17 grain elevators in Pennsylvania, Virginia, Delaware, New Jersey, New York and Maryland, Perdue is the HO soybean processor and grower partner for farmers in the Delmarva Peninsula. The HO soybeans are accepted at up to 14% crop moisture, with a discount schedule beyond that level for delivery to four of its locations.</p>
      <p>Perdue offers premiums starting at 50 cents/bushel. If farmers store their HO soybeans on‐farm and make them available for delivery at high‐demand times, that premium increases to 65 cents/bushel. If HO soybeans are planted on 100% of a grower’s acres devoted to the crop, the premium rises to 75 cents/bushel.</p>
      <p>Currently with 16 grain elevator partners in Indiana and Ohio, ADM is the grower partner and processor for farmers in the eastern Corn Belt, with its processor in Frankfort, Indiana. Four of the locations are ADM facilities where growers can sign up for harvest delivery contracts, with one location accepting on‐farm storage contracts. Premiums from ADM are similar to Perdue; for HO soybeans stored on‐farm and under 15% moisture (14.5% at some locations), the premium is 75 cents/bushel, while the premium is 55 cents/bushel when the crop is delivered at harvest.</p>
      <p>Bunge takes delivery at 24 locations in 2021. Premium options for 75 cents/bushel exist if a farmer is willing to store the crop and participate in a preferred buyer call between December 2021 and August 2022. Farmers who prefer to deliver at harvest will receive a 65 cent/bushel premium. The Bunge contract calls for a 14% maximum moisture.</p>
      <p>Though the HO soybean market was limited to these areas for 2021, it’s expected to expand for 2022 and beyond. Plans are underway for new HO soybean contracts, with acreage expected to grow to almost twice 2021 levels in 2022 and beyond in future years.</p>
      <h4>2021 PARTICIPATING COMPANIES AND PREMIUM OPTIONS*</h4>
      <table>
      <thead>
      <tr>
      <th>Company</th>
      <th>States for Delivery</th>
      <th>On‐Farm Storage Premium</th>
      <th>Harvest Delivery Premium</th>
      <th>Moisture Specifications</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <th>ADM</th>
      <td>Indiana & Ohio</td>
      <td>$0.75/bu.</td>
      <td>$0.55/bu.</td>
      <td>15% max moisture</td>
      </tr>
      <tr>
      <th>Bunge</th>
      <td>Indiana, Ohio and Michigan</td>
      <td>$0.75/bu.</td>
      <td>$0.65/bu.</td>
      <td>14% max moisture</td>
      </tr>
      <tr>
      <th>Perdue</th>
      <td>Delaware, Maryland, New Jersey, New York, Pennsylvania, and Virginia</td>
      <td>$0.65/bu.<br><small>$0.10 additional for 100% planted to Plenish™ soybeans</small></td>
      <td>$0.50/bu.<br><small>$0.10 additional for 100% planted to Plenish™ soybeans</small></td>
      <td>14% max moisture</td>
      </tr>
      </tbody>
      </table>
      <p><small>*Consult your nearest participating elevator for specific premium, delivery locations, delivery timeframe, and contract specifications. Source: Pioneer.com 2021 Plenish Contracting Options</small></p>
    `,
    sections: ['knowledge-center', 'market-analysis'],
  },
  {
    title: 'Soft IP Program',
    image: 'https://img.highoilsoy.com/knowledge-5.jpg',
    teaser: 'A soft IP program allows some room for error at the farm level.',
    body: `
      <p>A soft IP program allows some room for error at the farm level. The contracts are based on the commitment from the grower to plant a specific Plenish variety for 2021, so the requirements at delivery are somewhat lenient compared to traditional IP programs. High oleic oil content in soybeans is a genetic trait, meaning there’s not the variety of oil output compared to other crop output traits, so meeting the oil requirements is less restrictive.</p>
      <p>Conventional soybean oil is composed of approximately 60% polyunsaturated fatty acids, 25% monounsaturated fatty acids and 15% saturated fatty acids, whereas, HO soybean oil is made of around 75% oleic acid, with 20% less saturated fat and 2% to 3% linolenic acid. Eight percent of conventional soybean oil comprises linolenic acid, contributing to relative shelf instability compared to HO soybeans, which is why the low‐linolenic content is desirable. That is all in the genetics.<sup>4</sup></p>
      <p>As a “soft IP” program, farmers can account for what minimal oil content variance individual loads may show in testing by blending. As long as the grain meets minimum thresholds for oil contents on an aggregate level, it meets the requirements for processing as high oleic soybean oil. Strict farm‐level grain segregation is not necessary; as long as the soybeans meet the processor’s oil requirements at the right crop moisture levels, they’re accepted.</p>
      <p>A Simple On‐Farm Process:</p>
      <p>
      <ol>
      <li>Clean seed hopper or boxes before planting HO soybean varieties.</li>
      <li>Mark fields where planting HO soybeans varieties begins and ends.</li>
      <li>Run out a combine prior to and after harvesting HO soybeans.</li>
      <li>Clean bins, trucks, and wagons prior to handling HO soybeans to maintain purity.</li>
      </ol>
      </p>
      <p>As an example, Perdue requires 65% oleic acid content with their loads, which should be achievable with normal grain-handling procedures. Harvest equipment and storage facilities should be cleaned before storing HO Soybeans for the premium contracts, but the perception that equipment needs to be pristine is not accurate. The test is for minimal oil content based on the production of the approved varieties. If small amounts of unapproved varieties are in the load, it is acceptable if the delivered load contains the minimum required oil content.</p>
      <p>Testing typically takes less than 1 minute to complete, and a small number of loads are tested for sampling purposes. Tactically, this typically means farmers delivering HO soybeans to an elevator indicate their cargo via a placard and are directed to bins where the identity‐preserved (IP) grain is stored.</p>
    `,
    sections: ['knowledge-center'],
  },
  {
    title: 'Transportation and Storage Costs',
    image: 'https://img.highoilsoy.com/knowledge-4.jpg',
    teaser: 'Transportation and storage exist regardless of the crop, so HO Soybeans cost no more than any other production.',
    body: `
      <p>Transportation and storage costs exist regardless of the crop and HO Soybeans cost no more than any other production. Storage capacity in HO soybean production regions is a key piece of the puzzle to sustaining the premium program.</p>
      <p>For transportation, estimate what it costs to have someone locally haul grain. There needs to be a charge from the field to on‐farm storage if it’s available, as well as from the farm to the processing facility. Typically, within 15 miles $.06‐$.10/bushel will cover the cost from field to storage. From there, it just depends on how far the distance is to the processing facility, who is trucking it, or if it is being picked up will‐call on the farm.</p>
      <p>The other way to calculate the cost is knowing exactly how much trucking costs in fuel, maintenance, labor, overhead, depreciation, inflation, appreciation, and repairs annually. Take that number divided by the total bushels hauled on average to arrive at a per bushel cost.</p>
      <p>For storage and drying it is the same as any other crop. For commercial storage, simply input the flat fee or the cost to store per month times the number of months stored. If the soybeans are stored on‐farm, this number can be a bit trickier. There are four things to consider:</p>
      <p>
      <ol>
      <li>Amount of Storage</li>
      <li>Principal and Interest payments remaining on the storage.</li>
      <li>Life expectancy of the grain system</li>
      <li>Will there be upcoming upgrades?</li>
      </ol>
      </p>
      <p>What we need to be careful of is not over‐inflating the cost on an annual basis.</p>
      <p>Example:<br>
      <em>100,000 bushels of storage</em><br>
      <em>$50,000 of debt 20‐year life expectancy</em><br>
      <em>$50,000/100,000/20 = $.025 or $.03/bushel in storage.</em></p>
      <p>If there is significant grain‐handling equipment such as grain legs, dryer, etc. a general rule of thumb for handling is $.03 in and $.03 out. Every grain handling facility is different in cost, size, and complexity, as well as the frequency of turning the system if the farm doesn’t offer 100% storage capacity of the crop.</p>
    `,
    sections: ['knowledge-center'],
  },
  {
    title: 'Seed Selection',
    image: 'https://img.highoilsoy.com/knowledge-4.jpg',
    teaser: 'Competitive yields area reality and HO soybean varieties consistently perform as good or better than conventional numbers.',
    body: `
      <p>Competitive yields area reality and HO soybean varieties consistently perform as good or better than conventional numbers. With seven years of commercial trait development and a mature seed pipeline in place, growers have access to the varieties they need to raise trend yields with the added financial incentive of premiums up to 75 cents/bushel.</p>
      <p>In field trials from 2018 to 2020, Pioneer® Plenish HO soybeans showed in‐field performance on par with conventional varieties. High oil soybean varieties in Maryland trials showed a yield range between 76.2 and 103.2 bushels/acre, with trials in Pennsylvania yielding between 81.4 and 91.3 bushels/acre. Double‐crop yield trials in Delaware showed a yield of 68.3 bushels/acre. Average soybean yields for those three states ranged between 46 and 57 bushels/acre in 2020, according to USDA‐NASS data (<a href="https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=DELAWARE" target="_blank" rel="noopener">Delaware</a>, <a href="https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=MARYLAND" target="_blank" rel="noopener">Maryland</a>, <a href="https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=PENNSYLVANIA" target="_blank" rel="noopener">Pennsylvania</a>).</p>
      <p>High oleic soybean varieties have the same germplasm as conventional soybean varieties, which means they offer the same agronomic attributes. At the field level, that means the same input traits are in the seed, they are just applied to different output traits. That genetic foundation— combined with a relatively small number of available varieties—means HO soybeans take less time to integrate into traited platforms.</p>
      <p>In fact, Corteva has advanced 5 new varieties for the 2022 growing season. As the market evolves and grows, HO soybeans will contain common herbicide resistance and other key input traits available in today’s conventional soybean varieties.</p>
      <p>
      <img src="https://img.highoilsoy.com/seed-selection-map.png" alt="Outstanding Local Yields Crop Map">
      <small><em>Source: Pioneer Corteva AgriScience</em></small>
      </p>
    `,
    sections: ['find-your-seed'],
  },
  {
    title: 'Weed Control',
    image: 'https://img.highoilsoy.com/knowledge-3.jpg',
    href: '/WeedControl.pdf',
    target: '_blank',
    teaser: 'Weed control is an important consideration for any crop production decision and there are options with HO Soybeans.',
    sections: ['knowledge-center'],
  },
  {
    title: 'Double-Crop Opportunities',
    image: 'https://img.highoilsoy.com/doublecrop-hosoy-rapid-expansion-0921-revisedV2.jpg',
    href: '/doublecrop-hosoy-rapid-expansion-0921-revisedV2.pdf',
    target: '_blank',
    teaser: 'High oleic soybeans provide opportunity in a double-crop system.',
    sections: ['why-high-oleic'],
  },
].reduce((map, article) => {
  const slug = sluggify(article.title);
  map.set(slug, {
    ...article,
    slug,
    teaser: article.teaser || cheerio.load(article.body, { decodeEntities: true })('p:first-of-type').text(),
    sections: article.sections.reduce((m, alias) => { m.set(alias, true); return m; }, new Map()),
  });
  return map;
}, new Map());

module.exports = {
  /**
   *
   */
  Article: {
    /**
     *
     */
    id({ slug }) {
      return slug;
    },

    /**
     *
     */
    body({ body }) {
      return body.split('\n').map((v) => v.trim()).join('');
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    articleSlug(_, { input }) {
      const { slug, strict } = input;
      const article = articleMap.get(slug);
      if (!article && strict) {
        const error = new Error(`No article found for slug ${slug}`);
        error.statusCode = 404;
        throw error;
      }
      return article;
    },

    /**
     *
     */
    articlesForSection(_, { input }) {
      const { alias } = input;
      return [...articleMap.values()].filter((article) => article.sections.has(alias));
    },
  },
};
