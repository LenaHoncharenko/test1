def test_search
  fill_in('q', :with => 'cat')
  find('.btn').click
  assert( find('#results li').has_content?('cat'), 'Результаты поиска отображены' )
  assert( page.has_no_selector?('#results li.no-results'), 'Результаты поиска отсутствуют' )
end

